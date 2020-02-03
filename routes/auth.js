const express = require('express');
const {check, validationResult} = require('express-validator');

const User = require('../models/User');
const authUser = require('../middleware/auth_user');
const authAdmin = require('../middleware/auth_admin');
const router = express.Router();

//@route POST api/admin
//@desc Auth admin and get detail
//@access Public

router.post('/admin',[
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
  ] ,async (req, res) => {
    
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array()
        });
    };

    const {email, password} = req.body;
    try{
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({msg: 'Invalid credentails'});
        }
        const isMatch = user.password == password;
        if(!isMatch){
            return res.status(400).json({msg: 'Invalid credentails'});
        }
        let currentUser = {
            id: user.email,
            isAdmin: user.isAdmin
        }
        res.set('x-auth-token', 'admin');
        res.send(currentUser);
    }catch(err){
        console.log(err.message);
        res.status(500).send('Server error');
    }
});

//@route POST api/user
//@desc Auth user and get detail
//@access Public

router.post('/user',[
    check('cardNumber', 'Card number is required').exists(),
    check('cardPin', 'Card pin is required').exists()
  ] ,async (req, res) => {
    
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array()
        });
    };

    const {cardNumber, cardPin} = req.body;
    try{
        let user = await User.findOne({cardNumber});
        if(!user){
            return res.status(400).json({msg: 'Invalid credentails'});
        }
        const isMatch = user.cardPin == cardPin;
        if(!isMatch){
            return res.status(400).json({msg: 'Invalid credentails'});
        }
        let currentUser = {
            id: user.cardNumber,
            isAdmin: user.isAdmin
        }
        res.send(currentUser);
    }catch(err){
        console.log(err.message);
        res.status(500).send('Server error');
    }
});


module.exports = router;