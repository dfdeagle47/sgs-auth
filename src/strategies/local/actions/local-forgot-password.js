var passport = require('passport');
var util = require('util');
var _ = require('underscore');

module.exports = (function () {
	'use strict';

	/**
	 * PARSER - STARTER
	 */

	function PassportForgotPassword (options, verify) {

		passport.Strategy.call(this);

		this._verify = verify;

	}

	util.inherits(PassportForgotPassword, passport.Strategy);

	PassportForgotPassword.prototype.authenticate = function (req) {
		var username = req.body.username;

		this._verify(username, function (e, user) {
			if(e) {
				return this.error(e);
			}

			this.success(user);
		}.bind(this));
	};

	function LocalForgotPassword (config) {

		this.config = _.extend({}, config);

	}

	LocalForgotPassword.prototype.passportStrategy = PassportForgotPassword;

	LocalForgotPassword.prototype.name = 'local-forgotPassword';

	LocalForgotPassword.prototype.stateIn = [
		'registered',
		'registering'
	];

	LocalForgotPassword.prototype.stateOut = 'registering';

	LocalForgotPassword.prototype.steps = [
		'findUserByUsername',

		'validateState',

		'removeBearerAccounts',
		'createToken',
		'hashToken',
		'addBearerAccount',
		'removeInvalidTokens',

		'updateState',

		'saveUser'
	];

	LocalForgotPassword.prototype.parser = null;

	LocalForgotPassword.prototype.mapper = function (username, callback) {
		var mixin = {
			user: null,
			specs: {
				stateIn: this.stateIn,
				stateOut: this.stateOut
			},
			data: {
				username: username
			},
			accounts: []
		};

		return callback(null, mixin);
	};

	return LocalForgotPassword;

})();
