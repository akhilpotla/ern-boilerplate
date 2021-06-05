const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const config = require('config');
const User = require('../models/User');

const createUser = async (name, email, password) => {
    user = new User({
        name,
        email,
        password
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();
    return user;
}

const createToken = (userId) => {
    const payload = {
        user: {
            id: userId
        }
    };
    return jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 360000 });
}


module.exports = { createUser, createToken };
