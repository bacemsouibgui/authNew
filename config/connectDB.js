// require mongoose
const mongoose = require('mongoose');

// require dotenv
require('dotenv').config({path: './config/.env'})

const connectDB =async()=> {

    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('Mongoose connected')

    }
    catch(error) {
        console.log(error)

    }

}
module.exports = connectDB