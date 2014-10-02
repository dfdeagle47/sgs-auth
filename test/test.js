// var SGSAuth = require('../src/sgs-auth');
var SGSAuth = require('./coverage/instrument/src/sgs-auth');

var Delegates = require('./fixtures/delegates');

var bodyParser = require('body-parser');
var passport = require('passport');
var express = require('express');

var localStrategyTests = require('./local-strategy-tests');
var oauthStrategyTests = require('./oauth-strategy-tests');

describe('Testing the auth. module:', function () {
	'use strict';


	before('Initialising the module', function () {
		global.sgsAuth = new SGSAuth(Delegates, {
			facebook: {},
			google: {},
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
				res.status(200).json({
					token: req.user.data.token
				});
			}
		);

		app.post(
			'/auth/local/forgot_password',
			global.sgsAuth.with('local', 'forgotPassword'),
			function (req, res) {
				res.status(200).json({
					token: req.user.data.token
				});
			}
		);

		app.post(
			'/auth/local/reset_password',
			global.sgsAuth.with('local', 'resetPassword'),
			function (req, res) {
				res.status(200).json({
					token: req.user.data.token
				});
			}
		);

		app.post(
			'/auth/facebook/login',
			global.sgsAuth.with('facebook', 'login')
		);

		app.post(
			'/auth/google/login',
			global.sgsAuth.with('google', 'login')
		);

		app.listen(8000)
		.on('error', callback)
		.on('listening', callback);
	});

	describe('Local Strategy:', function () {
		localStrategyTests();
	});

	describe('OAuth Strategy:', function () {
		// oauthStrategyTests();
	});

});
