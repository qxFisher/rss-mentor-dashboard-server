const express = require('express');

const router = express.Router();
const { generate } = require('../scripts/jsonGenerator');

router.get('/', (req, res) => {
  const json = generate();
  res.header('Access-Control-Allow-Origin', '*');
  res.send(json);
});

module.exports = router;
