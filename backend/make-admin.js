const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const emailToPromote = process.argv[2];

if (!emailToPromote) {
    console.error('Please provide an email address: node make-admin.js user@example.com');
    process.exit(1);
}

const promoteToAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB...');

        const user = await User.findOneAndUpdate(
            { email: emailToPromote },
            { role: 'admin' },
            { new: true }
        );

        if (user) {
            console.log(`SUCCESS: User ${user.email} is now an admin.`);
        } else {
            console.log(`FAILURE: User with email ${emailToPromote} not found.`);
        }

        process.exit(0);
    } catch (err) {
        console.error('Error:', err);
        process.exit(1);
    }
};

promoteToAdmin();
