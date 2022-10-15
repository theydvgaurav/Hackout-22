const express = require('express');
require('dotenv').config();
require('./config/dbCon')
const log = console.log;
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 5000;
const routes = require('./routes/index')

app.use(express.json());
app.use(cors());
app.use('/', routes)
app.listen(PORT, () => { log(`Listening port ${PORT}`) })