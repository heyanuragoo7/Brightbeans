const express = require('express');
const route = express.Router();

const {encrypt,decrypt} = require('../controller/encrypt');

route.get('/encrypt', encrypt);

module.exports = route;