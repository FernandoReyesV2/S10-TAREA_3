const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const pool = require('./db'); // tu pool de postgres
require('dotenv').config();

const router = express.Router();

// Configura passport con Google
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/api/auth/google/callback',
},
async (accessToken, refreshToken, profile, done) => {
  try {
    // Extraer info básica del usuario
    const googleId = profile.id;
    const usuario = profile.emails[0].value;

    // Busca o crea usuario en la base de datos
    let result = await pool.query('SELECT * FROM usuarios WHERE google_id = $1', [googleId]);

    if (result.rows.length === 0) {
      // Insertar nuevo usuario con google_id
      await pool.query(
        'INSERT INTO usuarios (usuario, google_id) VALUES ($1, $2)',
        [usuario, googleId]
      );
      result = await pool.query('SELECT * FROM usuarios WHERE google_id = $1', [googleId]);
    }

    const user = result.rows[0];
    return done(null, user);
  } catch (err) {
    return done(err, null);
  }
}));

// Serialize y deserialize para sesiones
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const result = await pool.query('SELECT * FROM usuarios WHERE id = $1', [id]);
    done(null, result.rows[0]);
  } catch (err) {
    done(err, null);
  }
});

router.use(require('express-session')({
  secret: process.env.SESSION_SECRET || 'secret',
  resave: false,
  saveUninitialized: false,
}));

router.use(passport.initialize());
router.use(passport.session());

// Ruta para iniciar autenticación con Google
router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Callback de Google
router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // Aquí puedes crear un JWT para el usuario autenticado
    const jwt = require('jsonwebtoken');
    const token = jwt.sign(
      { id: req.user.id, usuario: req.user.usuario },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Redirigir a frontend con token en query o cookie
    res.redirect(`http://localhost:5173/login?token=${token}`);
  }
);

module.exports = router;
