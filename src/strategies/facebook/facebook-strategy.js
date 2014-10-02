var FacebookLogin = require('./actions/facebook-login');

var FacebookAddAccount = require('./steps/facebook-add-account.js');

var _ = require('underscore');

module.exports = (function () {
	'use strict';

	function FacebookStrategy (config) {

		this.stategy = 'facebook';

		config = _.extend({
			login: {}
		}, config);

		this.actions = {
			login: new FacebookLogin(config.login)
		};

		this.steps = {
			addFacebookAccount: new FacebookAddAccount()
		};

	}

	return FacebookStrategy;

})();
