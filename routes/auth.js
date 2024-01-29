// require router from express
const router = require('express').Router()
// require User
const User = require('../models/User')
// post === register
router.post('/register', async(req,res)=> {
    const {name, lastName, email, password} = req.body

    try {
        let user = await User.findOne({email})
        if(user) {
            return res.send({msg: 'user already exist'})
        }
        // create new user
       user = new User({name, lastName, email, password})
        // save the user
        await user.save()
        res.send({msg: 'User registred with success', user})
    }
    catch(error) {
        res.send({msg: 'server Error'})
 
    }
})
module.exports = router