var PassportLocal = require('passport-local').Strategy;
var passport = require('passport');

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
		'addLocalAccount',

		'createToken',
		'hashToken',
		'addBearerAccount',

		'updateState',

		'saveUser'
	];

	LocalLogin.prototype.parser = null;

	LocalLogin.prototype.mapper = function (username, password, callback) {
		var mixin = {
			user: null,
			specs: {
				stateIn: this.stateIn,
				stateOut: this.stateOut
			},
			dataIn: {
				username: username,
				password: password
			},
			dataOut: {},
		};

		return callback(null, mixin);
	};

	return LocalLogin;

})();
