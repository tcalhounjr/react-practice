const express = require('express');
const router = express.Router();
const auth = require('../../../middleware/auth');
const config = require('config');
const { check, validationResult } = require('express-validator');

const neode = require('neode')
    .fromEnv()
    .with({
        User: require("../../../models/User"),
        Profile: require('../../../models/Subcontractor'),
        Project: require('../../../models/Project')
    });

//@route  POST api/dbe/
//@desc   Create or update user profile
//@access Private

router.post('/',
    [auth,
        [
            check('title', 'Title is required').not().isEmpty(),
            check('desc', 'Description is required').not().isEmpty()
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const {
            title,
            desc
        } = req.body

        const profileNode = {};

        //Build project object
        const projectFields = {};
        if (title) projectFields.title = title;
        if (desc) projectFields.desc = desc;

        try {
            //Either create profiles and add relationships or update existing profiles
            let userNode = await neode.findById('User', req.login.id);
            if (userNode) {
                profileNode = await neode.cypher(config.get('userProfileQuery'), {
                    email: userNode.get('email')
                });
            }

            if (profileNode) {
                const projectNode = await neode.create('Project', projectFields);
                await profileNode.relateTo(projectNode, 'performed_on');
                return res.json({ pF: projectFields });
            }

        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
            console.trace();
            console.log(err.stack);
        }

        res.send('Something went terribly wrong. Go fix it!!!');

    }


);

module.exports = router;