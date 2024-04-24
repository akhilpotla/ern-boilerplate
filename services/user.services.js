const jwt = require('jsonwebtoken');

const config = require('config');
const connection = require('../config/db');

const createToken = (userId) => {
    const payload = {
        user: {
            id: userId
        }
    };
    return jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 360000 });
}

const getUser = (email) => {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM users WHERE email = ?`;
        connection.execute(query, [email], (err, results) => {
            if (err) {
                reject(err);
            } else if (results.length === 0) {
                resolve(undefined);
            } else {
                resolve(results[0]);
            }
        });
    });
}

module.exports = { createToken, getUser };
