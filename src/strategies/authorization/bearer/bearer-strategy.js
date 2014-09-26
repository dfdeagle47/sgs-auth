var BearerAuthorize = require('./bearer-authorize');
var BearerLogout = require('./bearer-logout');

var _ = require('underscore');

module.exports = (function () {
	'use strict';

	function BearerStrategy (app, config) {

		this.provider = 'google';

		config = _.extend({
			authorize: {},
			logout: {}
		}, config);

		this.authorize = new BearerAuthorize(config.authorize);
		this.logout = new BearerLogout(config.logout);

	}

	return BearerStrategy;

})();
