var express = require('express');
var logger = require('express-logger');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var config = require('../config');

module.exports = function (app) {
	app.use(logger({path: "./logfile.txt"}));

	app.use(cookieParser());
	app.use(session({secret: 'boletus con bogavante', resave: true, saveUninitialized: true}));
	//increase limit to avoid "413 Request Entity Too Large" error
	app.use(bodyParser.urlencoded({ extended: true, limit: config.limitDataTransferSize }));
	app.use(bodyParser.json({limit: config.limitDataTransferSize }));
	//expose session to views
	app.use(function (req, res, next){
		res.locals.session = req.session;
		next();
	})
}