require('dotenv').config();
const express = require('express');
require('./src/config_user');
const router = require('./src/routes');

const app = express();
app.use(express.json());
app.use('/api', router);

// eslint-disable-next-line no-console
app.listen(process.env.PORT, console.log('Server is listening on 5000'));
