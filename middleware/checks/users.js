const { check, validationResult } = require('express-validator');


const getUser = () => [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email address').isEmail(),
    check('password', 'Please enter a password with 6 or more characters')
        .isLength({min: 6})
];


module.exports = getUser;
