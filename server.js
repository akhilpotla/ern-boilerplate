const express = require('express');
const connection = require('./config/db');
const cors = require('cors');

const app = express();

// Init Middleware
app.use(express.json({
    extended: false
}));
app.use(cors());

app.get('/', (req, res) => res.send('API Running'));

// Define Routes
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/users', require('./routes/api/users'));


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
