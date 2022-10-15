const express = require('express');
require('dotenv').config();
const log = console.log;
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 5000;
require('./config/dbCon')

app.use(express.json());
app.use(cors());
// app.use('/', routes)
app.listen(PORT, () => { log(`Listening port ${PORT}`) })