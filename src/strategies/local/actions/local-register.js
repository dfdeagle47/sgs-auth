var PassportLocal = require('passport-local').Strategy;

var _ = require('underscore');

module.exports = (function () {
	'use strict';

	function LocalRegister (config) {

		this.config = _.extend({}, config);

	}

	LocalRegister.prototype.passportStrategy = PassportLocal;

	LocalRegister.prototype.name = 'local-register';

	LocalRegister.prototype.stateIn = [
		'initial'
	];

	LocalRegister.prototype.stateOut = 'registering';

	LocalRegister.prototype.steps = [
		'findUserByUsername',

		'hashPassword',
		'removeLocalAccount',
		'addLocalAccount',

		'createToken',
		'hashToken',
		'addBearerAccount',
		'removeInvalidTokens',

		'updateState',

		'createUser'
	];

	LocalRegister.prototype.mapper = function (username, password, callback) {
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
			accounts: []
		};

		return callback(null, mixin);
	};

	return LocalRegister;

})();
