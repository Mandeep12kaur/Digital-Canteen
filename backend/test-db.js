const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

console.log('Testing MongoDB connection to:', process.env.MONGODB_URI);

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('SUCCESS: MongoDB Connected');
        process.exit(0);
    })
    .catch((err) => {
        console.error('FAILURE: MongoDB Connection Error:', err);
        process.exit(1);
    });

setTimeout(() => {
    console.error('FAILURE: Connection timed out after 10 seconds');
    process.exit(1);
}, 10000);
