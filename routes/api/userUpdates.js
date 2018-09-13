const express = require('express');
const router = express.Router();

// const gravatar = require('gravatar');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
const passport = require('passport');

// const { keys } = require('../../keys'); 
const { User } = require('../../schemas/User');


// @route   GET api/users/current
// @desc    Return current user // Protected route using token
// @access  Private
router.put('/user', passport.authenticate('jwt', { session: false }),
    (req, res) => {

        let email = req.user.email;
        const newUserData = JSON.parse(req.body.updateUserData);
        console.log('----------------------------------');

        const cleanData = newUserData;

        User.findOne({ email })
            .then((user) => {

                user.info = {
                    ...user.info,
                    ...cleanData
                }

                user.save().then(newUpdate => {
                    return res.json({
                        ok: true,
                        user: newUpdate.info
                    });

                }).catch(err => console.log(err))
            }).catch(err => console.log(err))
    }

);


module.exports = router;