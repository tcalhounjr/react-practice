const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const neode = require('neode')
    .fromEnv()
    .with({ User: require("../../models/User") });

//@route  GET api/auth
//@desc   Test route
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

module.exports = router;