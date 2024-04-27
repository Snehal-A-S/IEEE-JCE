require('dotenv').config({path:'../.env'});
const mongoose = require('mongoose');
const inidata = require('./data.js');
const Event = require('../models/event.js'); // Import the Event model correctly

const mongo_url = process.env.MONGO_ATLAS;

async function main() {
    try {
        await mongoose.connect(mongo_url);
        await initDB(); // Initialize the database after connection
        console.log('Connected to DB');
    } catch (err) {
        console.error('Error connecting to DB:', err);
    }
}

const initDB = async () => {
    try {
        await Event.deleteMany({}); // Use the Event model correctly
        await Event.insertMany(inidata.data);
        console.log('Data was initialized');
    } catch (err) {
        console.error('Error initializing data:', err);
    }
};

main(); // Call the main function to start the database connection and initialization
