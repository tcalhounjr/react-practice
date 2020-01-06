const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs');

const neode = require('neode')
    .fromEnv()
    .with({ User: require("../../models/User") });

//@route  GET api/auth
//@desc   Get authneticated user token
//@access Public
router.get('/', auth, async (req, res) => {
    try {
        const node = await neode.findById('User', req.login.id);

        let user = {
            name: node.get('name'),
            email: node.get('email'),
            avatar: node.get('avatar')
        };

        res.json(user);

    } catch (err) {

        res.status(500).send('Server Error');
    }
});

//@route  POST api/auth
//@desc   Authenticate user and get token for login
//@access Public

router.post('/', [
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Password is required').exists()
],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }


        const { email, password } = req.body;


        try {
            //See if user exists

            let node = await neode.find('User', email);

            if (!node) {
                return res.status(400).json({ errors: [{ msg: 'Invalid login credentials' }] });
            }

            let user = {
                email: node.get('email'),
                password: node.get('password')
            };

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: 'Invalid login credentials' }] });
            }

            //Return jsonwebtoken
            const payload = {
                login: {
                    id: node.id()
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