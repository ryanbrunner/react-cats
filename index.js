var express = require('express');
var app = express();

var webpack = require('webpack');
var webpackMiddleware = require('webpack-dev-middleware');

var mongoose = require('mongoose');

// TODO: Enter a DB Name for your project
mongoose.connect('mongodb://localhost/db_name');

var bodyParser = require('body-parser');
app.use(bodyParser.json());

// Serve bundle.js
app.use(webpackMiddleware(webpack(require('./webpack.config.js'))));

// Serve your API assets here. You'll need to include the post route file.
app.use(express.static('public'));

app.use('/api/images', require('./api/images'));

// Include your API routes here
// app.use('/api/name', require('./api/name'));

// If none of the above matches, serve public/index.html.
app.get('*', (req, res) => res.sendFile(__dirname + '/public/index.html'))

app.listen(8080);
