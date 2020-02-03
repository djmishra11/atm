const express = require('express');
const {check, validationResult} = require('express-validator');
const Cash = require('../models/Cash');
const authAdmin = require('../middleware/auth_admin');
const authUser = require('../middleware/auth_user');
const router = express.Router();

//@route POST api/deposite
//@desc Deposit cash
//@access Private

router.post('/deposit', authAdmin, async (req, res) => {

    const {
        twoThousand,
        fiveHundred
    } = req.body;

    try{

        //// deposit money
        let money = await Cash.findOne({atmLocation: 'Silchar'});
        let updatedTwoThousand = 0;
        let updatedFiveHundred = 0;
        let total = 0;
        if(money){
            updatedTwoThousand = updatedTwoThousand + money.twoThousand;
            updatedFiveHundred = updatedFiveHundred +  money.fiveHundred;
            if(fiveHundred) updatedFiveHundred = updatedFiveHundred + fiveHundred;
            if(twoThousand) updatedTwoThousand = updatedTwoThousand + twoThousand;
            total = updatedFiveHundred * 500 + updatedTwoThousand * 2000;
            money = await Cash.findByIdAndUpdate(money._id,{
                twoThousand: updatedTwoThousand,
                fiveHundred: updatedFiveHundred,
                total
            })
        }else{
            if(fiveHundred) updatedFiveHundred = updatedFiveHundred + fiveHundred;
            if(twoThousand) updatedTwoThousand = updatedTwoThousand + twoThousand;
            total = updatedFiveHundred * 500  + updatedTwoThousand * 2000;
            money = await Cash.create({
                twoThousand: updatedTwoThousand,
                fiveHundred: updatedFiveHundred,
                total
            })
        }
        console.log(money)
        res.send({
            deposited: money
        });     
    }catch(err){
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});


//@route POST api/check
//@desc Check cash
//@access Private

router.get('/check', authAdmin, async (req, res) => {

    const {
        twoThousand,
        fiveHundred
    } = req.body;

    try{

        //// deposit money
        let money = await Cash.findOne({atmLocation: 'Silchar'});
        if(money){
            res.json({
                notes: money
            })
        }else{
            return res.status(400).json('Atm does not have money!');  
        }     
    }catch(err){
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});

//@route POST api/withdraw
//@desc Withdraw cash
//@access Private

router.post('/withdraw', [
    authUser,check('amount', 'amount can not be empty').not().isEmpty(), 
    check('amount', 'Amount must be numberic').isNumeric()], async (req, res) => {

    const {
        amount
    } = req.body;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    try{
        //// deposit money
        let money = await Cash.findOne({atmLocation: 'Silchar'});
    
        if(money){
            if(amount%500 != 0) return res.status(400).json('withdraw amount should be multiple of 500!');
            if(amount > 20000) return res.status(400).json('Maximum withdrawal amount is 20,000!');
            if(amount > money.total) return res.status(400).json('There is no enough cash!');
            let count = amount;
            let twoCount = 0;
            let fiveCount = 0;
            while(count > 0){
                if(count >= 2000){
                    count = count - 2000;
                    twoCount++;
                }
                if( count >= 500 && count < 2000){
                    count = count - 500;
                    fiveCount++;
                }
                if(count < 500) break;
            }
            
            let updatedTwoThousand = money.twoThousand - twoCount;
            let updatedFiveHundred = money.fiveHundred - fiveCount;
            let total = updatedFiveHundred * 500 + updatedTwoThousand * 2000;
            
            ///////////////////////////////////////////////
            //////////// update atm transaction //////////
            await Cash.findByIdAndUpdate(money._id,{
                twoThousand: updatedTwoThousand,
                fiveHundred: updatedFiveHundred,
                total
            })
            res.json({
                withdraw: {
                    fiveHundred: fiveCount,
                    twoThousand: twoCount 
                }
            });
        }else{
            return res.status(400).json('Atm does not have money!');
        }
        console.log(money)
        res.send({
            deposited: money
        });     
    }catch(err){
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});


module.exports = router;