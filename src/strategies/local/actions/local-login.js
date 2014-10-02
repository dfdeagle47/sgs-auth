var PassportLocal = require('passport-local').Strategy;

var _ = require('underscore');

module.exports = (function () {
	'use strict';

	function LocalLogin (config) {

		this.config = _.extend({}, config);

	}

	LocalLogin.prototype.passportStrategy = PassportLocal;

	LocalLogin.prototype.name = 'local-login';

	LocalLogin.prototype.stateIn = [
		'registered'
	];

	LocalLogin.prototype.stateOut = 'registered';

	LocalLogin.prototype.steps = [
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

	LocalLogin.prototype.mapper = function (username, password, callback) {
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

	return LocalLogin;

})();
