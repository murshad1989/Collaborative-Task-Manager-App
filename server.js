const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');



dotenv.config();

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Server is running...');
});

app.use('/api/auth', authRoutes);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});