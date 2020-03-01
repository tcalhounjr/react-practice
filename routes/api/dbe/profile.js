const express = require('express');
const router = express.Router();
const auth = require('../../../middleware/auth');
const config = require('config');
const { check, validationResult } = require('express-validator');

const neode = require('neode')
    .fromEnv()
    .with({
        User: require("../../../models/User"),
        Subcontractor: require('../../../models/Subcontractor')
    });

//@route  POST api/dbe/
//@desc   Create or update user profile
//@access Private

router.post('/',
    [auth,
        [
            check('name', 'Name is required').not().isEmpty(),
            check('phone', 'Phone number is required').not().isEmpty(),
            check('website', 'Website is required').not().isEmpty(),
            check('poc', 'poc is required').not().isEmpty(),
            check('naics', 'naics code is required').not().isEmpty(),
            check('designation', 'designation is required').not().isEmpty(),
            check('street_one', 'street_one is required').not().isEmpty(),
            check('city', 'city is required').not().isEmpty(),
            check('state', 'state is required').not().isEmpty(),
            check('zip', 'zip is required').not().isEmpty()
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const {
            name,
            phone,
            website,
            poc,
            naics,
            designation,
            certs,
            street_one,
            street_two,
            city,
            state,
            zip,
            youtube,
            facebook,
            twitter,
            instagram,
            linkedIn
        } = req.body

        //Build profile object
        const profileFields = {};
        if (name) profileFields.name = name;
        if (phone) profileFields.phone = phone;
        if (website) profileFields.website = website;
        if (poc) profileFields.poc = poc;
        if (naics) profileFields.naics = naics;
        if (designation) profileFields.designation = designation;
        if (certs) profileFields.certs = certs;
        if (street_one) profileFields.street_one = street_one;
        if (street_two) profileFields.street_two = street_two;
        if (city) profileFields.city = city;
        if (state) profileFields.state = state;
        if (zip) profileFields.zip = zip;

        //Build social object
        socialProfiles = {};
        if (youtube) socialProfiles.youtube = youtube;
        if (twitter) socialProfiles.twitter = twitter;
        if (facebook) socialProfiles.facebook = facebook;
        if (linkedIn) socialProfiles.linkedIn = linkedIn;
        if (instagram) socialProfiles.instagram = instagram;
        socialProfiles.userEmail = "";

        console.log('//////');
        console.log(req.login.id);
        console.log('//////');

        try {
            //Either create profiles and add relationships or update existing profiles
            let userNode = await neode.findById('User', 0);

            if (userNode) {
                console.log('inside if statement');
                console.log(userNode);
                //socialProfiles.userEmail = userNode.get('email');
                const profileNode = await neode.merge('Subcontractor', profileFields);
                console.log('profile node worked');
                console.log(profileNode);
                console.log('that was the profile node')
                //const socialNode = await neode.merge('SocialProfile', socialProfiles);
                await profileNode.relateTo(userNode, 'belongs_to');
                //await socialNode.relateTo(userNode, 'belongs_to');
                return res.json({ pF: profileFields });
            }

        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
            console.trace();
            console.log(err.stack);
            console.log(err.details);
        }

        console.log(profileFields);
        //res.send('Something went terribly wrong. Go fix it!!!');

    }


);

//@route  GET api/sub/profile/me
//@desc   Get current user's profile
//@access Private

router.get('/me', auth, async (req, res) => {
    try {
        console.log('******YOU ARE HERE********')
        const userNode = await neode.findById('User', req.login.id);
        console.log(userNode);
        const profileNode = await neode.cypher(config.get('userProfileQuery'), {
            email: userNode.get('email')
        });

        console.log('........');
        console.log(userNode);
        console.log('........');

        if (profileNode.records.length == 0) {
            return res.status(400).json({ msg: 'There is no profile for this user' });
        }

        let userProfile = await neode.hydrate(profileNode, 'profile').toJson();
        console.log('........');
        console.log(userProfile);
        console.log('........');
        res.json(userProfile);
    }
    catch (err) {
        console.error(err.messsage);
        res.status(500).send('Sever Error');
        console.error(err.details);
    }
});

module.exports = router;