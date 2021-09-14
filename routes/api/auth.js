const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

const config = require('config');
const postAuth = require('../../middleware/checks/auth');
const tokenAuth = require('../../middleware/auth');
const User = require('../../models/User');
const { createToken } = require('../../services/user.services');


// @route POST api/auth
// @desc Authenticate user & get token
// @access Public
router.post('/', postAuth(), async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                errors: [{ msg: 'Invalid Credentials' }]
            });
        }
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                errors: [{ msg: 'Invalid Credentials' }]
            });
        }

        token = createToken(user.id);
        res.json({ token });
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server error');
    }
});

module.exports = router;
