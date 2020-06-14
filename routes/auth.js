const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const User = mongoose.model('User')
const bcrypt = require('bcryptjs');

router.post('/signup', (req, res) => {
    const {name, email, password} = req.body;
    if(!email || !password || !name){
        res.status(422).json({error: "please add all the fields"});
    }
    User.findOne({email:email})
    .then((savedUser) => {
        if(savedUser){
            return res.status(442).json({error: "user already exists with that email"});
        }
        bcrypt.hash(password, 12)
        .then((hashedPassword) => {
            const user = new User({
                email,
                password: hashedPassword,
                name
            });
            user.save()
            .then((user) => {
                res.json({message: "Saved successfully"});
            })
            .catch((err) => {
                console.log(err);
            })
        })
        
    })
    .catch((err) => {
        console.log(err);
    })
});

router.post('/signin',(req, res) => {
    const {email, password} = req.body;
    if(!email || !password){
      return res.status(422).json({error: "Please provide email/password !"});
    }
    User.findOne({email:email})
    .then((savedUser) => {
        if(!savedUser){
            return res.status(422).json({error: "Invalid credentials!"});
        }
        bcrypt.compare(password, savedUser.password)
        .then((doMatch) => {
            if(doMatch){
                res.json({message: "Successfully signed in!"});
            }
            else{
                return res.status(422).json({error: "Invalid credentials!"});
            }
        })
        .catch((err) => {
            console.log(err);
        })
    })
    .catch((err) => {
        console.log(err);
    })
});
module.exports = router;