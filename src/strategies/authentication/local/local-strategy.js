var LocalChangePassword = require('./local-change-password');
var LocalResetPassword = require('./local-reset-password');
var LocalVerifyEmail = require('./local-verify-email');
var LocalRegister = require('./local-register');
var LocalLogin = require('./local-login');

var _ = require('underscore');

module.exports = (function () {
	'use strict';

	function FacebookStrategy (app, config) {

		this.provider = 'facebook';

		config = _.extend({
			changePassword: {},
			resetPassword: {},
			verifyEmail: {},
			register: {},
			login: {}
		}, config);

		this.actions = {
			changePassword: new LocalChangePassword(config.changePassword),
			resetPassword: new LocalResetPassword(config.resetPassword),
			verifyEmail: new LocalVerifyEmail(config.verifyEmail),
			register: new LocalRegister(config.register),
			login: new LocalLogin(config.login)
		};

	}

	return FacebookStrategy;

})();
