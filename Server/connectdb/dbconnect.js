const mongoose = require('mongoose');
require('dotenv').config();

const dbconnect = () => {

    mongoose.connect(process.env.MONGO_URL)
    .then( () => {
        console.log("Connected to MongoDB");
    })
    .catch( () => {
        console.log("Error while connecting to MongoDB");
    })

}

module.exports = dbconnect