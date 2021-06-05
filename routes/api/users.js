const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

const config = require('config');
const postUser = require('../../middleware/checks/users');
const User = require('../../models/User');
const { createUser, createToken } = require('../../services/user.services');

// @route POST api/users
// @desc Register user
// @access Public
router.post('/', postUser(), async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({
                errors: [{ msg: 'User already exists' }]
            });
        }

        user = createUser(name, email, password);
        token = createToken(user.id);
        res.json({ token });
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server error');
    }
});

module.exports = router;
