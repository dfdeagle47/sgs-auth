var passport = require('passport');
var util = require('util');

var _ = require('underscore');

module.exports = (function () {
	'use strict';

	/**
	 * PARSER - STARTER
	 */

	function PassportChangePassword (options, verify) {

		passport.Strategy.call(this);

		this._verify = verify;

	}

	util.inherits(PassportChangePassword, passport.Strategy);

	PassportChangePassword.prototype.authenticate = function (req) {
		var username = req.body.username;
		var password = req.body.password;
		var newPassword = req.body.newPassword;

		this._verify(username, password, newPassword, function (e, user) {
			if(e) {
				return this.error(e);
			}

			this.success(user);
		}.bind(this));
	};

	/**
	 * PARSER - END
	 */

	function LocalChangePassword (config) {

		this.config = _.extend({}, config);

	}

	LocalChangePassword.prototype.passportStrategy = PassportChangePassword;

	LocalChangePassword.prototype.name = 'local-changePassword';

	LocalChangePassword.prototype.stateIn = [
		'registered'
	];

	LocalChangePassword.prototype.stateOut = 'registered';

	LocalChangePassword.prototype.steps = [
		'findUserByUsername',

		'validateState',

		'comparePassword',
		'removeLocalAccount',

		'hashPassword',
		'addLocalAccount',
	
		'createToken',
		'hashToken',
		'addBearerAccount',
		'removeInvalidTokens',

		'updateState',

		'saveUser'
	];

	LocalChangePassword.prototype.mapper = function (username, password, newPassword, callback) {
		var mixin = {
			user: null,
			specs: {
				stateIn: this.stateIn,
				stateOut: this.stateOut
			},
			data: {
				username: username,
				password: password,
				newPassword: newPassword
			},
			accounts: []
		};

		return callback(null, mixin);
	};

	return LocalChangePassword;

})();
