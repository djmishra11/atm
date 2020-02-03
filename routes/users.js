const express = require('express');
const {check, validationResult} = require('express-validator');
const User = require('../models/User');

const router = express.Router();

//@route POST api/admin
//@desc Register a Admin
//@access Public

router.post('/admin',[
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({min: 6})
],
async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    const {email, password} = req.body;
    try{
        let user = await User.findOne({email});
        if(user){
            return res.status(400).json({
                msg: 'User already exists'
            })
        };

        //save user
        user = await User.create({
            email: email,
            password: password,
            isAdmin: true
        })

        console.log(email);
        res.send({email: user.email});
        
    }catch(err){
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});

//@route POST api/user
//@desc Register a User
//@access Public

router.post('/user',[
    check('cardNumber', 'Please enter 8 digit card number').isLength(8),
    check('cardPin', 'Please enter 4 character password').isLength(4)
],
async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    const {cardNumber, cardPin} = req.body;
    try{
        let user = await User.findOne({cardNumber});
        if(user){
            return res.status(400).json({
                msg: 'User already exists'
            })
        };

        //save user
        user = await User.create({
            cardNumber,
            cardPin
        })

        res.send({card: user.cardNumber});
        
    }catch(err){
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;