const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const path = require('path');
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const config = require('config');

//Load Neode with the variables stored in `.env` and tell neode
//to look for models in the ../../models directory

const neode = require('neode')
    .fromEnv()
    .with({ User: require("../../models/User") });

console.log(neode);

//@route  POST api/users
//@desc   Register user
//@access Public
router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Please enter a password with 8 or more characters').isLength({ min: 6 })
],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        console.log(req.body);

        const { name, email, password } = req.body;
        console.log(name + ' email is ' + email + ' and his password is ' + password);

        try {
            //See if user exists
            console.log('before db call');
            let user = await neode.find('User', email);
            console.log('after db call');
            console.log(user);
            if (user) {
                return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
            }

            //Get user's avatar
            const avatar = gravatar.url(email, {
                s: '200',
                r: 'pg',
                d: 'mm'
            });

            //Create new User object
            console.log(user);
            let newUser = {
                name,
                email,
                avatar,
                password
            };
            console.log(newUser);

            //Encrypt password
            const salt = await bcrypt.genSalt(10);
            newUser.password = await bcrypt.hash(password, salt);
            console.log(newUser);

            //Store user in DB
            let newNode = await neode.create('User', newUser);
            console.log('check for ID');
            console.log(newNode.id());

            //Return jsonwebtoken
            const payload = {
                login: {
                    id: newNode.id()
                }
            }

            jwt.sign(
                payload,
                config.get('jwtSecret'),
                { expiresIn: 360000000 },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token });
                }
            );

        } catch (err) {
            console.log('here I am');
            console.trace();
            console.log(err.stack);
        }


    });
module.exports = router;