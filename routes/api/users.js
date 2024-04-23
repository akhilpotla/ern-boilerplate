const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

const config = require('config');
const connection = require('../../config/db');
const postUser = require('../../middleware/checks/users');

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
        const salt = await bcrypt.genSalt(config.get('salt'));
        const encryptedPassword = await bcrypt.hash(password, salt);
        const query = `INSERT INTO users (name, password, email) VALUES (?, ?, ?)`;
        connection.execute(query, [name, encryptedPassword, email], (err, results) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(409).json({ error: 'User already exists' });
                }
                return res.status(500).send('Server error');
            }
            res.json('Registered');
        });
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server error');
    }
});

module.exports = router;
