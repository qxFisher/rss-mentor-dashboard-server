const express = require('express');
const data = require('./routes/data');
const generate = require('./routes/generate');

const app = express();

app.use(express.json());
app.use('/api/data', data);
app.use('/api/generate', generate);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
