var PassportGoogle = require('passport-google-oauth').OAuth2Strategy;

var _ = require('underscore');

module.exports = (function () {
	'use strict';

	function GoogleLogin (config) {

		this.config = _.extend({}, config);

	}

	GoogleLogin.prototype.passportStrategy = PassportGoogle;

	GoogleLogin.prototype.name = 'google-login';

	GoogleLogin.prototype.stateIn = [
		'registered'
	];

	GoogleLogin.prototype.stateOut = 'registered';

	GoogleLogin.prototype.steps = [
		'findUserByUsername',

		'validateState',

		'comparePassword',

		'createToken',
		'hashToken',
		'addBearerAccount',
		'removeInvalidTokens',

		'updateState',

		'saveUser'
	];

	GoogleLogin.prototype.mapper = function (username, password, callback) {
		var mixin = {
			user: null,
			specs: {
				stateIn: this.stateIn,
				stateOut: this.stateOut
			},
			data: {
				username: username,
				password: password
			},
			accounts: []
		};

		return callback(null, mixin);
	};

	return GoogleLogin;

})();
