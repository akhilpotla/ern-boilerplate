const request = require('supertest');

const app = require('../server');
const { sequelize } = require('../config/db');

beforeAll(async () => {   
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
});

afterAll(async () => {
    await sequelize.drop();
    await sequelize.close();
});

describe('POST /api/users', () => {
    it('Should register a user', async () => {
        const res = await request(app).post('/api/users').send({
            name: 'john',
            email: 'john@example.com',
            password: 'password'
        });
        expect(res.statusCode).toBe(200);
    });

    it('Should fail to register a user with the same email', async () => {
        const res = await request(app).post('/api/users').send({
            name: 'john',
            email: 'john@example.com',
            password: 'password'
        });
        expect(res.statusCode).toBe(409);
    });
});