var GoogleLogin = require('./actions/google-login');

var GoogleAddAccount = require('./steps/google-add-account.js');

var _ = require('underscore');

module.exports = (function () {
	'use strict';

	function GoogleStrategy (config) {

		this.strategy = 'google';

		config = _.extend({
			login: {}
		}, config);

		this.actions = {
			login: new GoogleLogin(config.login)
		};

		this.steps = {
			addGoogleAccount: new GoogleAddAccount()
		};

	}

	return GoogleStrategy;

})();
