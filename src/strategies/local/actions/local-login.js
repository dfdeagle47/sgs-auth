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

	LocalLogin.prototype.specs = {
		stateIn: 'initial',
		steps: [
			'findUserByUsername',

			'validateState',

			'comparePassword',
			'addLocalAccount',

			'createToken',
			'hashToken',
			'addBearerAccount',

			'updateState',

			'saveUser'
		],
		stateOut: 'registering'
	};

	LocalLogin.prototype.parser = null;

	LocalLogin.prototype.mapper = function (username, password, callback) {
		var mixin = {
			user: null,
			specs: {
				stateIn: this.specs.stateIn,
				stateOut: this.specs.stateOut
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
