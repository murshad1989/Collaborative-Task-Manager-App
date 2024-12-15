const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

dotenv.config();

require('./config/db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Collaborative Task Manager App Backend is running.');
});

app.listen(PORT, () => {
  console.log(`Congratulation Server is running on http://localhost:${PORT}`);
});
