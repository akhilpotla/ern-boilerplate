const { check } = require('express-validator');

const postAuth = () => [
    check('email', 'Please include a valid email address').isEmail(),
    check('password', 'Password is required').exists()
];

module.exports = postAuth;
