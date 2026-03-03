const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
dotenv.config();

const check = async () => {
    await mongoose.connect(process.env.MONGODB_URI);
    const users = await User.find({}, 'name email role');
    console.log(JSON.stringify(users, null, 2));
    process.exit();
};
check();
