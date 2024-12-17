const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

const authRouter = require('./routes/auth');
const db = require('./config/db');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());


app.use('/api/auth', authRouter);

app.get('/', (req, res) => {
  res.send('Collaborative Task Manager App Backend is running.');
});


app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});


app.listen(PORT, () => {
  console.log(`Congratulation! Server is running on http://localhost:${PORT}`);
});
