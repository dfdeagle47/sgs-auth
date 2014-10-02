var passport = require('passport');
var util = require('util');
var _ = require('underscore');

module.exports = (function () {
	'use strict';

	/**
	 * PARSER - STARTER
	 */

	function PassportVerifyEmail (options, verify) {

		passport.Strategy.call(this);

		this._verify = verify;

	}

	util.inherits(PassportVerifyEmail, passport.Strategy);

	PassportVerifyEmail.prototype.authenticate = function (req) {
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

	function LocalVerifyEmail (config) {

		this.config = _.extend({}, config);

	}

	LocalVerifyEmail.prototype.passportStrategy = PassportVerifyEmail;

	LocalVerifyEmail.prototype.name = 'local-verifyEmail';

	LocalVerifyEmail.prototype.stateIn = [
		'registering'
	];

	LocalVerifyEmail.prototype.stateOut = 'registered';

	LocalVerifyEmail.prototype.steps = [
		'findUserByUsername',

		'validateState',

		'comparePassword',

		'compareToken',
		'removeBearerAccount',
	
		'removeBearerAccounts',
		'createToken',
		'hashToken',
		'addBearerAccount',
		'removeInvalidTokens',

		'updateState',

		'saveUser'
	];

	LocalVerifyEmail.prototype.parser = null;

	LocalVerifyEmail.prototype.mapper = function (username, password, token, callback) {
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

	return LocalVerifyEmail;

})();
