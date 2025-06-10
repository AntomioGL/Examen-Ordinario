const express = require('express');
const cors = require('cors');
const postresRoutes = require('./routes/postres');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/postres', postresRoutes);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});