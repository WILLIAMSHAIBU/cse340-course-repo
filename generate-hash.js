import bcrypt from 'bcrypt';

const password = process.argv[2];

if (!password) {
    console.log('Usage: node generate-hash.js <password>');
    process.exit(1);
}

bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
        console.error('Error generating hash:', err);
        process.exit(1);
    }
    console.log('Password hash:', hash);
});
