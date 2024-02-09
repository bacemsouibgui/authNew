const { body, validationResult } = require('express-validator');

// registerRules
const registerRules =()=> [

    body("name", "Name is required").notEmpty(),
    body("lastName", "LastName is required").notEmpty(),
    body("email", "Email is required").isEmail(),
    body("password", "Password must contain between 6 and 20 characters").isLength({
        min: 6,
        max: 20
    })
];

// loginRules
const loginRules =()=> [
    body("email", "Email is Required").isEmail(),
    body("password", "Password must contain between 6 and 20 characters").isLength({
        min: 6,
        max: 20
    })
]

// middleware validator
const validator =(req, res, next)=> {
const errors = validationResult(req)
if(!errors.isEmpty()) {
    return res.status(400).send({
        errors: errors.array().map((el)=>({
            msg: el.msg

        }))
    })
}
next()
}
module.exports= {validator, registerRules,loginRules }