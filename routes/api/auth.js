const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

const connection = require('../../config/db');
const postAuth = require('../../middleware/checks/auth');
const { createToken, getUser } = require('../../services/user.services');


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
        const query = `SELECT * FROM users WHERE email = ?`;
        const user = await getUser(email);

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
