const express = require('express');

const app = express();

const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.all('/*', function(req, res, next) {
    // CORS headers
    res.header("X-Frame-Options", "ALLOW-FROM https://www.google.com https://www.youtube.com"); // restrict it to the required domain
    res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS,PATCH');
    // Set custom headers for CORS
    res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key,Authorization,X-Frame-Options');
    if (req.method == 'OPTIONS') {
        res.status(200).end();
    } else {
        next();
    }
});


app.use('/api/users', require('./components/user'))
app.use('/api/tasks', require('./components/task'))

module.exports = app;
