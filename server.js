const express = require('express');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const { sequelize, User } = require('./config/db');
const cors = require('cors');
const config = require('config');
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const app = express();

const sessionStore = new SequelizeStore({db: sequelize});

// Init Middleware
app.use(express.json({
    extended: false
}));

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true, // IMPORTANT: this must be set to true to allow sending and receiving cookies
}));

app.use(session({
    secret: "please work",
    saveUninitialized: false,
    resave: false,
    store: sessionStore,
    cookie: {
        maxAge: 10 * 60 * 1000,
        httpOnly: true,
        secure: false
    }
}));

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
    }, async function(username, password, done) {
      try {
        const user = await User.findOne({ where: { email: username } });
        if (!user) {
          return done(null, false, { message: 'Incorrect email.' });
        }
        bcrypt.compare(password, user.password, function(err, res) {
          if (res) {
            return done(null, user);
          } else {
            return done(null, false, { message: 'Incorrect password.' });
          }
        });
      } catch (err) {
        return done(err);
      }
    }
));

passport.serializeUser((user, done) => {
    done(null, user.id); // Serialize user ID to the session
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findOne({ where: { id: id } });
        done(null, user); // Deserialize user from the rows returned by MySQL
    } catch (error) {
        done(error);
    }
});

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => res.send('API Running'));

// Define Routes
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/users', require('./routes/api/users'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
