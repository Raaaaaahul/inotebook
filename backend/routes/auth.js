//importing files
const express = require('express');
const User = require('../models/User');
const router = express.Router();
const {body,validationResult} = require('express-validator');


//creating a user using POST: "/api/auth" , doesnot require auth


router.post('/',[
    body('name','Please enter a valid name').isLength({min:3}),
    body('email', 'Please enter valid email address!').isEmail(),
    body('password','Password must be atleast 5 characters long').isLength({min:5})
],(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json({errors:errors.array()});
    }
    User.create({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email
    }).then(user=>res.json(user));
})

module.exports = router