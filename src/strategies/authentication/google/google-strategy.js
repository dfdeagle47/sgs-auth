var GoogleLogin = require('./google-login');

var _ = require('underscore');

module.exports = (function () {
	'use strict';

	function GoogleStrategy (app, config) {

		this.provider = 'google';

		config = _.extend({
			login: {}
		}, config);

		this.actions = {
			login: new GoogleLogin(config.login)
		};

	}

	return GoogleStrategy;

})();
