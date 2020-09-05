// Express Server
const express = require("express");
// Debug console
const connectedPort = require("debug")("app:connectedPort");

// Configuration
const config = require("config");

// Application
const app = express();

// Routes
const routes = require("./routes/routes");

// Custom Settings
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', "*");
    next();
});


app.use('/api/english', routes);

const port = process.env.NODE_ENV || 3000;
app.listen(port, () => connectedPort(`Express Server is connected on port ${port}`));
module.exports = port;