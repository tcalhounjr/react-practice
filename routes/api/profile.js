const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const config = require('config');
const { check, validationResult } = require('express-validator');

const neode = require('neode')
    .fromEnv()
    .with({
        User: require("../../models/User"),
        Profile: require('../../models/Profile'),
        SocialProfile: require('../../models/SocialProfile')
    });



//@route  GET api/profile/me
//@desc   Get current user's profile
//@access Private
router.get('/me', auth, async (req, res) => {
    try {
        const userNode = await neode.findById('User', req.login.id);
        const profileNode = await neode.cypher(config.get('userProfileQuery'), {
            email: userNode.get('email')
        });

        if (profileNode.records.length == 0) {
            return res.status(400).json({ msg: 'There is no profile for this user' });
        }

        let userProfile = {
            test: 'this is the user profile'
        };

        res.json(userProfile);
    }
    catch (err) {
        console.error(err.messsage);
        res.status(500).send('Sever Error');
    }
});

//@route  POST api/profile/
//@desc   Create or update user profile
//@access Private

router.post('/',
    [auth,
        [
            check('status', 'Status is required').not().isEmpty(),
            check('skills', 'At least one skill is required').not().isEmpty()
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const {
            company,
            website,
            location,
            status,
            skills,
            bio,
            githubusername,
            experience,
            education,
            youtube,
            facebook,
            twitter,
            instagram,
            linkedIn
        } = req.body

        //Build profile object
        const profileFields = {};
        if (company) profileFields.company = company;
        if (website) profileFields.website = website;
        if (location) profileFields.location = location;
        if (status) profileFields.status = status;
        if (bio) profileFields.bio = bio;
        if (githubusername) profileFields.githubusername = githubusername;
        if (education) profileFields.education = education;
        if (experience) profileFields.experience = experience;
        if (education) profileFields.education = education;
        if (skills) {
            // let skillsArray = skills.split(',').map(skill => skill.trim());
            // if necessary, just build the skills array once it's pulled from the DB
            profileFields.skills = skills;
        }

        //Build social object
        socialProfiles = {};
        if (youtube) socialProfiles.youtube = youtube;
        if (twitter) socialProfiles.twitter = twitter;
        if (facebook) socialProfiles.facebook = facebook;
        if (linkedIn) socialProfiles.linkedIn = linkedIn;
        if (instagram) socialProfiles.instagram = instagram;
        socialProfiles.userEmail = "";

        try {
            //Either create profiles and add relationships or update existing profiles
            const userNode = await neode.findById('User', req.login.id);
            if (userNode) {
                socialProfiles.userEmail = userNode.get('email');
                const profileNode = await neode.merge('Profile', profileFields);
                const socialNode = await neode.merge('SocialProfile', socialProfiles);
                await profileNode.relateTo(userNode, 'belongs_to');
                await socialNode.relateTo(userNode, 'belongs_to');
                return res.json({ pF: profileFields, sF: socialProfiles });
            }

        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
            console.trace();
            console.log(err.stack);
        }

        console.log(profileFields.skills)
        res.send('Something went terribly wrong. Go fix it!!!');

    }


);

//@route  GET api/profile/
//@desc   Get all profiles
//@access Public
router.get('/', async (req, res) => {
    try {
        let userProfilesArray = [];
        let allProfiles = {};
        const users = await neode.cypher(config.get('allUsersQuery'));

        //This line returns a collection of results in the form of an array
        //The 'u' represents the return alias used in the query 
        let usersArray = await neode.hydrate(users, 'u').toJson();

        for (let i = 0; i < usersArray.length; i++) {
            let userProfile = await neode.cypher(config.get('userProfileQuery'), {
                email: usersArray[i].email
            });
            let nextProfileNode = await neode.hydrate(userProfile, 'profile').toJson();
            userProfilesArray.push(nextProfileNode);

        }

        allProfiles = {
            users: usersArray,
            profiles: userProfilesArray
        }

        res.json(allProfiles);
    }
    catch (err) {
        console.error(err.messsage);
        res.status(500).send('Sever Error');
    }
});

module.exports = router;