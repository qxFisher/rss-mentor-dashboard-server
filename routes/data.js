const express = require('express');

const router = express.Router();
const data = require('../data/data.json');

router.get('/', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.send(data);
});

module.exports = router;
