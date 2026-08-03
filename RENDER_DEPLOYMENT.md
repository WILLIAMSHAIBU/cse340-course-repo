# Render Deployment Instructions

## Prerequisites
- PostgreSQL database (can be Render PostgreSQL or external)
- Render account with web service deployment

## Setup Steps

### 1. Database Setup
Your application needs a PostgreSQL database. You can either:
- Use Render's built-in PostgreSQL service
- Use an external PostgreSQL database (like the one you're currently using)

### 2. Environment Variables
In your Render web service dashboard, set these environment variables:

**Required:**
- `DB_URL` - Your PostgreSQL connection string
  - Format: `postgresql://username:password@host:port/database`
  - Example: `postgresql://cse340_database:password@dpg-xxx.oregon-postgres.render.com:5432/database_name`
- `SESSION_SECRET` - A random string for session encryption (Render can auto-generate this)
- `NODE_ENV` - Set to `production`
- `PORT` - Set to `10000` (Render's default port)

**Optional:**
- `ENABLE_SQL_LOGGING` - Set to `true` to log SQL queries (for debugging only)

### 3. Database Initialization
After deployment, you'll need to initialize your database with the schema and data:

1. Access your Render service's shell (via Render dashboard)
2. Run the setup script:
   ```bash
   node setup-database.js
   ```

Or use the reset script to start fresh:
```bash
node reset-database.js
```

### 4. Create Admin User
To create an admin user for managing the application:

```bash
node create-admin.js "Admin Name" "admin@example.com" "SecurePassword123!"
```

## Common Issues

### Database Connection Issues
- Ensure `DB_URL` is correctly set in Render environment variables
- Check that your database allows connections from Render's IP addresses
- Verify SSL settings in the database connection

### Session Issues
- Make sure `SESSION_SECRET` is set
- The app uses `trust proxy: 1` for Render's load balancer
- Sessions are configured for production with secure cookies

### Port Issues
- Render uses port 10000 by default
- The app respects the `PORT` environment variable

## Database Connection
The application uses connection pooling with retry logic for production environments, making it more resilient to temporary connection issues.

## Monitoring
Check Render logs for:
- Database connection status
- Application errors
- Request/response logs (in development mode only)

## Troubleshooting
If features aren't working on Render:
1. Check environment variables are set correctly
2. Verify database connection in Render logs
3. Ensure database schema is initialized
4. Check for any runtime errors in logs
5. Test database connectivity locally first