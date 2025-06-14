const express = require('express');
const cors = require('cors');
const authRoutes = require('./rutas');
require('dotenv').config();
const authGoogleRoutes = require('./authGoogle');
const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/api', authRoutes);

app.use('/api', authGoogleRoutes);

app.get('/', (req, res) => {
  res.send('Backend funcionando');
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
