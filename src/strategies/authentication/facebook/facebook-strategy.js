var FacebookLogin = require('./actions/facebook-login');

var _ = require('underscore');

module.exports = (function () {
	'use strict';

	function FacebookStrategy (app, config) {

		this.stategy = 'facebook';

		config = _.extend({
			login: {}
		}, config);

		this.actions = {
			login: new FacebookLogin(config.login)
		};

	}

	return FacebookStrategy;

})();
