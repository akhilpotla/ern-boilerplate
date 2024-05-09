const express = require('express');
const router = express.Router();
const passport = require('passport');
const { validationResult } = require('express-validator');

const postAuth = require('../../middleware/checks/auth');
const config = require('config');

// @route POST api/auth
// @desc Authenticate user & initiate session
// @access Public
router.post(
    '/', [ postAuth(), passport.authenticate('local')], (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    res.status(200).json({
        message: "Logged in",
        user: { id: req.user.id, name: req.user.name }
    });
});

module.exports = router;
