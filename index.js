const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();
const faunaClient = require('./fauna');

const port = process.env.PORT || 3001;
const app = express();

app.use(cors());

app.listen(port, () => {
    console.log(`App listening on port: ${port}`)
})
