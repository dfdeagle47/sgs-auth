var SGSAuth = require('../src/sgs-auth');

var Delegates = require('./fixtures/delegates');
var World = {
	user: require('./fixtures/user')
};

var bodyParser = require('body-parser');
var supertest = require('supertest');
var passport = require('passport');
var express = require('express');

var request = supertest('http://localhost:8000');

describe('Testing the auth. module:', function () {
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
			'/auth/local/register',
			global.sgsAuth.with('local', 'register'),
			function (req, res) {
				res.status(200).json({
					token: req.user.data.token
				});
			}
		);

		app.post(
			'/auth/local/verify_email',
			global.sgsAuth.with('local', 'verifyEmail'),
			function (req, res) {
				res.status(200).json({
					token: req.user.data.token
				});
			}
		);

		app.get(
			'/auth/bearer/authorize',
			global.sgsAuth.with('bearer', 'authorize'),
			function (req, res) {
				res.status(200).end();
			}
		);

		app.get(
			'/auth/bearer/logout',
			global.sgsAuth.with('bearer', 'logout'),
			function (req, res) {
				res.status(200).end();
			}
		);

		app.post(
			'/auth/local/login',
			global.sgsAuth.with('local', 'login'),
			function (req, res) {
				res.status(200).json({
					token: req.user.data.token
				});
			}
		);

		app.post(
			'/auth/local/change_password',
			global.sgsAuth.with('bearer', 'authorize'),
			global.sgsAuth.with('local', 'changePassword'),
			function (req, res) {
				res.status(200).end();
			}
		);

		app.listen(8000)
		.on('error', callback)
		.on('listening', callback);
	});

	it('- register', function (callback) {
		request
		.post('/auth/local/register')
		.send({
			username: World.user.username,
			password: World.user.password
		})
		.expect(200)
		.end(function (e, res) {
			if(e) {
				return callback(e);
			}

			World.registerToken = res.body.token;
			callback(null);
		});
	});

	it('- verify email', function (callback) {
		request
		.post('/auth/local/verify_email')
		.send({
			username: World.user.username,
			password: World.user.password,
			token: World.registerToken
		})
		.expect(200)
		.end(function (e, res) {
			if(e) {
				return callback(e);
			}

			World.apiToken = res.body.token;
			callback(null);
		});
	});


	it('- authorize', function (callback) {
		request
		.get('/auth/bearer/authorize')
		.set('Authorization', 'bearer ' + World.apiToken)
		.expect(200, callback);
	});

	it('- logout', function (callback) {
		request
		.get('/auth/bearer/logout')
		.set('Authorization', 'bearer ' + World.apiToken)
		.expect(200, callback);
	});

	it('- login', function (callback) {
		request
		.post('/auth/local/login')
		.send({
			username: World.user.username,
			password: World.user.password
		})
		.expect(200)
		.end(function (e, res) {
			if(e) {
				return callback(e);
			}

			World.apiToken = res.body.token;
			callback(null);
		});
	});

	it('- change password', function (callback) {
		request
		.post('/auth/local/change_password')
		.set('Authorization', 'bearer ' + World.apiToken)
		.send({
			username: World.user.username,
			password: World.user.password,
			newPassword: World.user.newPassword
		})
		.expect(200, callback);
	});

});
