var SGSAuth = require('../src/sgs-auth');

var Delegates = require('./fixtures/delegates');

var bodyParser = require('body-parser');
var supertest = require('supertest');
var passport = require('passport');
var express = require('express');

var request = supertest('http://localhost:8000');

describe('Testing the auth. module', function () {
	'use strict';


	before('Initialising the module', function () {
		global.sgsAuth = new SGSAuth(Delegates, {
			bearer: {},
			local: {}
		});
	});

	before('Initialising test server', function (callback) {
		var app = express();

		app.use(bodyParser.urlencoded({
			extended: true
		}));
		app.use(bodyParser.json());
		app.use(passport.initialize());

		app.post(
			'/auth/local/login',
			global.sgsAuth.with('local', 'login')
		);

		app.listen(8000)
		.on('error', callback)
		.on('listening', callback);
	});

	it('Login', function (callback) {
		var username = 'test@example.com';
		var password = 'test';

		request
		.post('/auth/local/login')
		.send({
			username: username,
			password: password
		})
		.expect(200, callback);
	});

});
