const User = require('../models/usersModel');
const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authMiddleware = require("../middlewares/authMiddleware");

// Register
router.post('/register', async (req, res)=> {
    try {

        //Check if the user exist
        const user = await User.findOne({ email: req.body.email });

        if(user){
            return res.send({
                success: false,
                message: 'User already exist'
            })
        }

        //Hash Password and Save user
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashedPassword;

        const newUser = new User(req.body);
        await newUser.save();

        res.send({
            success: true,
            message: 'User created successfully. Log In to continue'
        });

    } catch (error) {
        res.send({
            success: false,
            message: error.message
        });
    }
});

//Login
router.post('/login', async (req, res)=> {

    try {

        //Check if the user exist
        const user = await User.findOne({ email: req.body.email });
        if(!user){
            return res.send({
                success: false,
                message: 'User does not exist'
            })
        }

        //Check if the password is correct

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if(!validPassword) {
            return res.send({
                success: false,
                message: 'Not a valid password'
            });
        }

        //Create and assign a token
        const token = jwt.sign(
            {
                userId: user._id,
            },
            process.env.jwt_secret,
            {
                expiresIn: '1d'
            }
        );
        //Send the token to the client
        res.send({
            success: true,
            message: 'User logged in with success',
            data: token
        });

    } catch (error) {
        res.send({
            success: false,
            message: error.message
        });
    }
});

//Get user details from token
router.get('/getuser',authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.body.userId);
        res.send({
            success: true,
            message: 'User details fetched with success',
            data: user
        })
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
});

module.exports = router;