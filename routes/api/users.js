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
        await connection.query(query, [name, encryptedPassword, email]);

        const [users] = await connection.query('SELECT * FROM users WHERE email = ?', [email]);
        const user = users[0];

        req.login(user, (err) => {
            if (err) {
                console.error('Login failed', err);
                return res.status(500).send('Login after registration failed');
            }
            res.json({
                message: 'Registered and logged in',
                user: { id: req.user.id, name: req.user.name }
            });
        });

    } catch (err) {
        console.error(err.message);
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ errors: [{ msg: 'User already exists'}] });
        }
        return res.status(500).send({ errors: [{ msg: 'Server error'}] });
    }
});

router.get('/', async (req, res) => {
    if (req.isAuthenticated()) {
        res.status(200).send('Authenticated');
    } else {
        res.status(401).send('Unauthorized');
    }
});

module.exports = router;
