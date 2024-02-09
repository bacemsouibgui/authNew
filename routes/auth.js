// require router from express
const router = require('express').Router()
// require User
const User = require('../models/User');
// require isAuth
const isAuth = require('../middlewares/isAuth')
// require bcrypt
const bcrypt = require('bcrypt');
// require token
var jwt = require('jsonwebtoken');

// require validator
const {validator, registerRules, loginRules} = require('../middlewares/validator')

// post === register
router.post('/register',registerRules(), validator, async(req,res)=> {
    
    const {name, lastName, email, password} = req.body

    try {
        let user = await User.findOne({email})
        if(user) {
            return res.status(401).json({msg: 'user already exist'})
        }
        // create new user
       user = new User({name, lastName, email, password})

       // bcrypt
       // create salt and hash
       const salt = 3;
       const hashedPassword = await bcrypt.hash(password, salt)
       // replace password with hashedPassword
       user.password = hashedPassword

        // save the user
        await user.save()

    // token
    // sign the user
    const payload = {
        id: user._id
    }
   // generate token
    const token = await jwt.sign(payload, 'sgggghhhhhh', {
        expiresIn: '7 days'
    })


        res.status(200).send({msg: 'User registred with success', user, token})
    }
    catch(error) {
        res.status(500).send({msg: 'server Error'})
 
    }
})

// Login User
// Post api
// @acces public

router.post("/login", loginRules(), validator, async(req,res)=> {
   const {email, password} = req.body
   try {
let user =await User.findOne({email})

if(!user) {
    return res.status(401).send({msg: 'Bad Credentials ! email'})
}

// check password
const isMatch = await bcrypt.compare(password, user.password)

if(!isMatch) {
    return res.status(401).send({msg: 'Bad credentials! password'})
}

    // token
    // sign the user
    const payload = {
        id: user._id
    }
   // generate token
    const token = await jwt.sign(payload, 'sgggghhhhhh', {
        expiresIn: '7 days'
    })
res.status(200).send({msg: 'Logged with success', user, token})
   }
   catch(error) {
console.log(error)
   }
})

//@route GET api/auth/user
//@desc get authentified user
//@access private
router.get("/user",isAuth,(req,res)=>{
    res.send({user:req.user})
})



module.exports = router