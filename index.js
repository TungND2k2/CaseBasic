const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = require('./src/router/userRouter');
const useragent = require('express-useragent');

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(useragent.express());


app.use('/', router);


app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});