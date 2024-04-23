const jwt = require('jsonwebtoken');

const config = require('config');

const createToken = (userId) => {
    const payload = {
        user: {
            id: userId
        }
    };
    return jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 360000 });
}


module.exports = { createToken };
