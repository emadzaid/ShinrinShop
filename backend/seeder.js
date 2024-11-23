const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '../.env') }); // exact path to .env file

const connectDB = require('./config/connectDB');
connectDB();

const products = require('./data/products');
const users = require('./data/users')

const User = require('./models/userModel');
const Product = require('./models/productModel');

const colors = require('colors');

const importData = async () => {
    try {
        // clear database
        await User.deleteMany();
        await Product.deleteMany();
        // create users
        const createdUsers = await User.insertMany(users);
        const adminUser = createdUsers[0]._id; // get admin user's id

        // Attach admin user to all products
        const sampleProducts = products.map((product) => {
            return {user:adminUser, ...product};
        });

        await Product.insertMany(sampleProducts);    
        console.log('Data Imported'.green);    

    } catch (error) {
        console.log(error);
    }
 
}

const destroyData = async () => {
    try {
        await User.deleteMany();
        await Product.deleteMany();
        console.log('Data Destroyed'.red);    

    } catch (error) {
        console.log(error);
    }

}

process.argv[2] === '-d' ? destroyData() : importData()