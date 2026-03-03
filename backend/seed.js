const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const User = require('./models/User');

dotenv.config();

const products = [
    {
        name: 'Gourmet Cheese Burger',
        description: 'A juicy beef patty topped with melted cheddar cheese, fresh lettuce, and our secret sauce.',
        price: 8.99,
        category: 'Main Course',
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
        isAvailable: true,
    },
    {
        name: 'Spicy Chicken Wrap',
        description: 'Grilled chicken strips with spicy mayo, crunchy peppers, and onions in a toasted tortilla.',
        price: 6.50,
        category: 'Snacks',
        image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=800&q=80',
        isAvailable: true,
    },
    {
        name: 'Classic Margherita Pizza',
        description: 'Hand-tossed dough topped with fresh mozzarella, basil, and Italian tomato sauce.',
        price: 12.00,
        category: 'Main Course',
        image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=800&q=80',
        isAvailable: true,
    },
    {
        name: 'Iced Caramel Macchiato',
        description: 'Rich espresso combined with milk and caramel syrup, served over ice.',
        price: 4.50,
        category: 'Drinks',
        image: 'https://images.unsplash.com/photo-1485808191679-5f86510681a2?auto=format&fit=crop&w=800&q=80',
        isAvailable: true,
    },
    {
        name: 'Chocolate Lava Cake',
        description: 'Warm chocolate cake with a gooey molten center, served with vanilla ice cream.',
        price: 5.99,
        category: 'Desserts',
        image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?auto=format&fit=crop&w=800&q=80',
        isAvailable: true,
    },
    {
        name: 'Avocado Toast',
        description: 'Smashed avocado on sourdough bread with poached eggs and chili flakes.',
        price: 7.50,
        category: 'Breakfast',
        image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80',
        isAvailable: true,
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB for seeding...');

        await Product.deleteMany();
        await User.deleteMany();
        console.log('Cleared existing data.');

        await Product.insertMany(products);
        console.log('Successfully seeded database with products.');

        // Seed Admin
        await User.create({
            name: 'Mandeep Kaur',
            email: 'maheymandeep2@gmail.com',
            password: 'adminpassword123',
            role: 'admin'
        });
        console.log('Successfully seeded admin user: maheymandeep2@gmail.com / adminpassword123');

        process.exit();
    } catch (err) {
        console.error('Error seeding database:', err);
        process.exit(1);
    }
};

seedDB();
