
import { Pool } from 'pg';

/**
 * Connection pool for PostgreSQL database.
 * 
 * A connection pool maintains a set of reusable database connections
 * to avoid the overhead of creating new connections for each request.
 * This improves performance and reduces load on the database server.
 * 
 * Uses a connection string from environment variables for simplified setup.
 * The connection string format is:
 * postgresql://username:password@host:port/database
 */
// Parse connection string to get individual components
const dbUrl = process.env.DB_URL;

if (!dbUrl) {
    throw new Error('DB_URL environment variable is not set');
}

const parsedUrl = new URL(dbUrl);

const pool = new Pool({
    host: parsedUrl.hostname,
    port: parsedUrl.port || 5432,
    database: parsedUrl.pathname.substring(1),
    user: parsedUrl.username,
    password: decodeURIComponent(parsedUrl.password),
    ssl: {
        rejectUnauthorized: false
    },
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 10000
});

/**
 * Common SSL Issue:
 *
 * You may encounter SSL connection errors depending on your operating system, Node.js
 * version, or PostgreSQL server settings. If you have confirmed your credentials are
 * correct but still see SSL errors, try updating the 'ssl' property in the Pool
 * configuration above to:
 *
 * ssl: {
 *     rejectUnauthorized: false
 * }
 */

/**
 * Since we will modify the normal pool object in development mode, we need to create and
 * export a reference to the pool object. This allows us to use the same name for the
 * export regardless of whether we are in development or production mode.
 */
let db = null;

if (process.env.NODE_ENV === 'development' && process.env.ENABLE_SQL_LOGGING === 'true') {
    /**
     * In development mode, we wrap the pool to provide query logging.
     * This helps with debugging by showing all executed queries in the console.
     * 
     * The wrapper also adds timing information to help identify slow queries
     * and tracks the number of rows affected by each query.
     */
    db = {
        async query(text, params) {
            const maxRetries = 3;
            let lastError;
            
            for (let attempt = 1; attempt <= maxRetries; attempt++) {
                try {
                    const start = Date.now();
                    const res = await pool.query(text, params);
                    const duration = Date.now() - start;
                    console.log('Executed query:', { 
                        text: text.replace(/\s+/g, ' ').trim(), 
                        duration: `${duration}ms`, 
                        rows: res.rowCount 
                    });
                    return res;
                } catch (error) {
                    lastError = error;
                    console.error(`Query attempt ${attempt} failed:`, { 
                        text: text.replace(/\s+/g, ' ').trim(), 
                        error: error.message 
                    });
                    
                    // If it's a connection error and not the last attempt, retry
                    if (error.message.includes('Connection terminated') || 
                        error.message.includes('connect') ||
                        error.code === 'ECONNRESET') {
                        if (attempt < maxRetries) {
                            console.log(`Retrying in 2 seconds... (${attempt}/${maxRetries})`);
                            await new Promise(resolve => setTimeout(resolve, 2000));
                            continue;
                        }
                    }
                    throw error;
                }
            }
            throw lastError;
        },

        async close() {
            await pool.end();
        }
    };
} else {
    /**
     * In production, we wrap the pool with retry logic but without logging overhead.
     * This ensures connection reliability in production environments like Render.
     */
    db = {
        async query(text, params) {
            const maxRetries = 3;
            let lastError;
            
            for (let attempt = 1; attempt <= maxRetries; attempt++) {
                try {
                    const res = await pool.query(text, params);
                    return res;
                } catch (error) {
                    lastError = error;
                    
                    // If it's a connection error and not the last attempt, retry
                    if (error.message.includes('Connection terminated') || 
                        error.message.includes('connect') ||
                        error.code === 'ECONNRESET') {
                        if (attempt < maxRetries) {
                            await new Promise(resolve => setTimeout(resolve, 2000));
                            continue;
                        }
                    }
                    throw error;
                }
            }
            throw lastError;
        },

        async close() {
            await pool.end();
        }
    };
}

/**
 * Tests the database connection by executing a simple query.
 */
const testConnection = async() => {
    try {
        const result = await db.query('SELECT NOW() as current_time');
        console.log('Database connection successful:', result.rows[0].current_time);
        return true;
    } catch (error) {
        console.error('Database connection failed:', error.message);
        throw error;
    }
};

export { db as default, testConnection };
