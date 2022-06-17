const express = require('express');
const router = express.Router();

const User = require('../models/Users');
const fetchUser = require('../middleware/fetchUser')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const JWT_SECRET ='nefoiqjwfoajf3op'


router.post('/signup',[
    body('name', 'Enter valid name').isLength({ min: 3 }),
    body('email', 'Enter valid email').isEmail(), 
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }) ] ,
    async (req, res)=>{
        //if invalidation occurs
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
    }

    //check weather user exists with this email already?
    try{
        let user = await User.findOne({email: req.body.email});
        if(user){
            return res.status(400).json({error: ' user already exists'})
        }
        
        const salt = await bcrypt.genSalt(10);
        const secPassword = await bcrypt.hash(req.body.password, salt)

        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPassword,
        })

        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);

        res.json({'status': 'success','authToken': authToken})
    }catch(err){
        console.log(err.message);
        res.status(500).send('Internal server error ')
    }
})

router.post('/login',[
    body('email', 'Enter valid email').isEmail(),
    body('password', 'password cannot be blank').exists() ],
    async (req, res)=>{
        //if invalidation occurs
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
    }

    const {email, password} = req.body;
    try{
        let user = await User.findOne({email: email});
        if(!user){
            return res.status(400).json({error: 'try to connect with correct login credintials'})
        }

        const pss = await bcrypt.compare(password, user.password)
        if(!pss){
            return res.status(400).json({error: 'try to connect with correct login credintials'})
        }

        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);

        res.json({'status': 'success', 'authToken': authToken})
     
    }catch(err){
        console.log(err.message);
        res.status(500).send('internal server error ')
    }
})


router.post('/getuser', fetchUser , async (req, res)=>{
    try{
        let userId = req.user.id;
        const user = await User.findById(userId).select('-password')
        res.send(user)
     
    }catch(err){
        console.log(err.message);
        res.status(500).send('internal server error ');
    }
})

module.exports = router;