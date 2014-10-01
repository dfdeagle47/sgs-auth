var GoogleLogin = require('./actions/google-login');

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

	}

	return GoogleStrategy;

})();