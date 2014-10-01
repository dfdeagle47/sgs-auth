var LocalChangePassword = require('./actions/local-change-password');
var LocalResetPassword = require('./actions/local-reset-password');
var LocalVerifyEmail = require('./actions/local-verify-email');
var LocalRegister = require('./actions/local-register');
var LocalLogin = require('./actions/local-login');

var LocalComparePassword = require('./steps/local-compare-password');
var LocalHashPassword = require('./steps/local-hash-password');
var LocalAddAccount = require('./steps/local-add-account');

var _ = require('underscore');

module.exports = (function () {
	'use strict';

	function LocalStrategy (config) {

		this.strategy = 'local';

		config = _.extend({
			changePassword: {},
			resetPassword: {},
			verifyEmail: {},
			register: {},
			login: {}
		}, config);

		this.actions = {
			// changePassword: new LocalChangePassword(config.changePassword),
			// resetPassword: new LocalResetPassword(config.resetPassword),
			// verifyEmail: new LocalVerifyEmail(config.verifyEmail),
			// register: new LocalRegister(config.register),
			login: new LocalLogin(config.login)
		};

		this.steps = {
			comparePassword: new LocalComparePassword({}),
			addLocalAccount: new LocalAddAccount({}),
			hashPassword: new LocalHashPassword({})
		};

	}

	return LocalStrategy;

})();
