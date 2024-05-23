const request = require('supertest');
const bcrypt = require('bcryptjs');

const app = require('../server');
const { sequelize, User } = require('../config/db');
const config = require('config');

beforeAll(async () => {   
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    const salt = await bcrypt.genSalt(config.get('salt'));
    const encryptedPassword = await bcrypt.hash('password', salt);
    await User.create({
        name: 'john',
        email: 'john@example.com',
        password: encryptedPassword
    });
});

afterAll(async () => {
    await sequelize.drop();
    await sequelize.close();
});

describe('POST /api/auth', () => {
    it('Should authenticate a user', async () => {
        const res = await request(app).post('/api/auth').send({
            email: 'john@example.com',
            password: 'password'
        });
        expect(res.statusCode).toBe(200);
    });

    it('Should fail to authenticate a user with wrong email', async () => {
        const res = await request(app).post('/api/auth').send({
            email: 'steve@example.com',
            password: 'password'
        });
        expect(res.statusCode).toBe(401);
    });

    it('Should fail to authenticate a user with wrong password', async () => {
        const res = await request(app).post('/api/auth').send({
            email: 'john@example.com',
            password: 'passwordpassword'
        });
        expect(res.statusCode).toBe(401);
    });
});