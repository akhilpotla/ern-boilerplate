const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Database Name
        const dbName = 'daybookDB';
        const db = await mongoose.connect(
            `mongodb://127.0.0.1:27017/${dbName}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log(`Database connected : ${db.connection.host}`);
    } catch  (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}

module.exports = connectDB;
