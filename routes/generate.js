const express = require('express');

const router = express.Router();
const jsonGenerator = require('../scripts/jsonGenerator');

router.get('/', (req, res) => {
  const json = jsonGenerator();
  res.header('Access-Control-Allow-Origin', '*');
  res.send(json);
});

module.exports = router;
