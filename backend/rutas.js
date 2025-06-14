const express = require('express');
const router = express.Router();
const pool = require('./db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Registro
router.post('/register', async (req, res) => {
  const { usuario, contrasena } = req.body;

  try {
    const existe = await pool.query('SELECT * FROM usuarios WHERE usuario = $1', [usuario]);

    if (existe.rows.length > 0) {
      return res.status(400).json({ error: 'El usuario ya existe' });
    }

    const hashedPassword = await bcrypt.hash(contrasena, 10);
    await pool.query(
      'INSERT INTO usuarios (usuario, contrasena) VALUES ($1, $2)',
      [usuario, hashedPassword]
    );

    res.json({ mensaje: 'Usuario registrado exitosamente' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { usuario, contrasena } = req.body;

  try {
    const result = await pool.query('SELECT * FROM usuarios WHERE usuario = $1', [usuario]);

    if (result.rows.length === 0) {
      return res.status(400).json({ error: 'Usuario no encontrado' });
    }

    const user = result.rows[0];
    const match = await bcrypt.compare(contrasena, user.contrasena);

    if (!match) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    // Crear el token
    const token = jwt.sign(
      { id: user.id, usuario: user.usuario },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ mensaje: 'Login exitoso', token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

module.exports = router;
