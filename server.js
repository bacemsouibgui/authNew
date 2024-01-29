// require express
const express = require('express')
// init express
const app = express()
// require connectDB
const connectDB = require('./config/connectDB')
connectDB()
// Middleware ===Parse data to json
app.use(express.json())
// require the router
const authRouter = require('./routes/auth')
app.use('/api/auth', authRouter )
// server
const port = 5000;
// lunch the server
app.listen(port, (error)=> {
    error ? console.log(error) : console.log(`server is running on port ${port}`)
})