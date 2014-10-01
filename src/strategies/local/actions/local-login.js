var PassportLocal = require('passport-local').Strategy;
var passport = require('passport');

var _ = require('underscore');

module.exports = (function () {
	'use strict';

	function LocalLogin (config) {

		config = _.extend({}, config);

		this.name = 'local-login';

		passport.use(
			this.name,
			new PassportLocal(
				config,
				this.run.bind(this)
			)
		);

		return passport.authenticate(this.name, {
			session: false
		});

	}

	LocalLogin.prototype.run = function (username, password, callback) {
		callback(null, false);
	};

	LocalLogin.prototype.steps = [
		'findUserByLocal',

		'validateState',

		'comparePassword',
		'addLocalAccount',

		'createToken',
		'hashToken',
		'addBearerAccount',

		'updateState',

		'saveUser'
	];

	return LocalLogin;

})();
