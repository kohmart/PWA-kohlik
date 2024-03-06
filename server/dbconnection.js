const mongoose = require('mongoose');
const MONGODB_URI = process.env.MONGODB_URI
require('dotenv').config();

const connectDB = async () => {
    try {
        mongoose.set("strictQuery", false);
        mongoose.connect(MONGODB_URI);
        console.log('MongoDB connected')
    } catch (error) {
        console.log(error)
    }
};