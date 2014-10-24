// var SGSAuth = require('../src/sgs-auth');
var SGSAuth = require('./coverage/instrument/src/sgs-auth');

var OAuthKeys = require('./fixtures/oauth-keys');
var Delegates = require('./fixtures/delegates');

var bodyParser = require('body-parser');
var passport = require('passport');
var express = require('express');

var localStrategyTests = require('./local-strategy-tests');
var oauthStrategyTests = require('./oauth-strategy-tests');

describe('Testing the auth. module:', function () {
	'use strict';


	before('Initialising the module', function () {
		SGSAuth.init(Delegates, {
			facebook: OAuthKeys.facebook,
			google: OAuthKeys.google,
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
			SGSAuth.with('local', 'register'),
			function (req, res) {
				res.status(200).json({
					token: req.auth.token
				});
			}
		);

		app.post(
			'/auth/local/easy-register',
			SGSAuth.with('local', 'easyRegister'),
			function (req, res) {
				res.status(200).json({
					token: req.auth.token
				});
			}
		);

		app.post(
			'/auth/local/verify_email',
			SGSAuth.with('local', 'verifyEmail'),
			function (req, res) {
				res.status(200).json({
					token: req.auth.token
				});
			}
		);

		app.get(
			'/auth/bearer/authorize',
			SGSAuth.with('bearer', 'authorize'),
			function (req, res) {
				res.status(200).end();
			}
		);

		app.get(
			'/auth/bearer/logout',
			SGSAuth.with('bearer', 'logout'),
			function (req, res) {
				res.status(200).end();
			}
		);

		app.post(
			'/auth/local/login',
			SGSAuth.with('local', 'login'),
			function (req, res) {
				res.status(200).json({
					token: req.auth.token
				});
			}
		);

		app.post(
			'/auth/local/change_password',
			SGSAuth.with('bearer', 'authorize'),
			SGSAuth.with('local', 'changePassword'),
			function (req, res) {
				res.status(200).json({
					token: req.auth.token
				});
			}
		);

		app.post(
			'/auth/local/forgot_password',
			SGSAuth.with('local', 'forgotPassword'),
			function (req, res) {
				res.status(200).json({
					token: req.auth.token
				});
			}
		);

		app.post(
			'/auth/local/reset_password',
			SGSAuth.with('local', 'resetPassword'),
			function (req, res) {
				res.status(200).json({
					token: req.auth.token
				});
			}
		);

		app.get(
			'/auth/facebook/login',
			SGSAuth.with('facebook', 'login')
		);

		app.get(
			'/auth/facebook/login_callback',
			SGSAuth.with('facebook', 'login')
		);

		app.get(
			'/auth/google/login',
			SGSAuth.with('google', 'login')
		);

		app.get(
			'/auth/google/login_callback',
			SGSAuth.with('google', 'login')
		);

		app.listen(8000)
		.on('error', callback)
		.on('listening', callback);
	});

	describe('Local Strategy:', function () {
		localStrategyTests();
	});

	describe('OAuth Strategy:', function () {
		oauthStrategyTests();
	});

});
