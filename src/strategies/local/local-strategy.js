var LocalForgotPassword = require('./actions/local-forgot-password');
var LocalChangePassword = require('./actions/local-change-password');
var LocalResetPassword = require('./actions/local-reset-password');
var LocalEasyRegister = require('./actions/local-easy-register');
var LocalVerifyEmail = require('./actions/local-verify-email');
var LocalRegister = require('./actions/local-register');
var LocalLogin = require('./actions/local-login');

var LocalComparePassword = require('./steps/local-compare-password');
var LocalRemoveAccount = require('./steps/local-remove-account');
var LocalHashPassword = require('./steps/local-hash-password');
var LocalAddAccount = require('./steps/local-add-account');

var _ = require('underscore');

module.exports = (function () {
	'use strict';

	function LocalStrategy (config) {

		this.strategy = 'local';

		config = _.extend({
			forgotPassword: {},
			changePassword: {},
			resetPassword: {},
			verifyEmail: {},
			register: {},
			login: {}
		}, config);

		this.actions = {
			forgotPassword: new LocalForgotPassword(config.forgotPassword),
			changePassword: new LocalChangePassword(config.changePassword),
			resetPassword: new LocalResetPassword(config.resetPassword),
			easyRegister: new LocalEasyRegister(config.easyRegister),
			verifyEmail: new LocalVerifyEmail(config.verifyEmail),
			register: new LocalRegister(config.register),
			login: new LocalLogin(config.login)
		};

		this.steps = {
			removeLocalAccount: new LocalRemoveAccount({}),
			comparePassword: new LocalComparePassword({}),
			addLocalAccount: new LocalAddAccount({}),
			hashPassword: new LocalHashPassword({})
		};

	}

	return LocalStrategy;

})();
