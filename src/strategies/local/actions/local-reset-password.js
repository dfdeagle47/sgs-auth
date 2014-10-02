var passport = require('passport');
var util = require('util');
var _ = require('underscore');

module.exports = (function () {
	'use strict';

	/**
	 * PARSER - STARTER
	 */

	function PassportResetPassword (options, verify) {

		passport.Strategy.call(this);

		this._verify = verify;

	}

	util.inherits(PassportResetPassword, passport.Strategy);

	PassportResetPassword.prototype.authenticate = function (req) {
		var username = req.body.username;
		var password = req.body.password;
		var token = req.body.token;

		this._verify(username, password, token, function (e, user) {
			if(e) {
				return this.error(e);
			}

			this.success(user);
		}.bind(this));
	};

	/**
	 * PARSER - END
	 */

	function LocalResetPassword (config) {

		this.config = _.extend({}, config);

	}

	LocalResetPassword.prototype.passportStrategy = PassportResetPassword;

	LocalResetPassword.prototype.name = 'local-resetPassword';

	LocalResetPassword.prototype.stateIn = [
		'registering'
	];

	LocalResetPassword.prototype.stateOut = 'registered';

	LocalResetPassword.prototype.steps = [
		'findUserByUsername',

		'validateState',

		'compareToken',
		'removeBearerAccount',

		'hashPassword',
		'removeLocalAccount',
		'addLocalAccount',
	
		'createToken',
		'hashToken',
		'addBearerAccount',
		'removeInvalidTokens',

		'updateState',

		'saveUser'
	];

	LocalResetPassword.prototype.parser = null;

	LocalResetPassword.prototype.mapper = function (username, password, token, callback) {
		var mixin = {
			user: null,
			specs: {
				stateIn: this.stateIn,
				stateOut: this.stateOut
			},
			data: {
				username: username,
				password: password,
				token: token
			},
			accounts: []
		};

		return callback(null, mixin);
	};

	return LocalResetPassword;

})();
