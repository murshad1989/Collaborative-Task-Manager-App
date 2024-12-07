const { MongoClient } = require('mongodb');

// Make sure your connection string is complete
const uri = 'mongodb+srv://admin:Murshad313@cluster0.lsx7b.mongodb.net/task_manager?retryWrites=true&w=majorityconnectTimeoutMS=10000&socketTimeoutMS=10000';';

const client = new MongoClient(uri);

async function connectDB() {
    try {
        await client.connect();
        console.log('Connected to MongoDB Atlas');
        return client.db('task_manager'); // Use the database 'task_manager'
    } catch (error) {
        console.error('Failed to connect to MongoDB Atlas:', error);
        process.exit(1); // Exit if connection fails
    }
}

module.exports = connectDB;
