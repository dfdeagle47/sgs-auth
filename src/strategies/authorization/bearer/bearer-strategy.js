var BearerAuthorize = require('./actions/bearer-authorize');
var BearerLogout = require('./actions/bearer-logout');

var BearerCompareToken = require('./steps/bearer-compare-token');

var _ = require('underscore');

module.exports = (function () {
	'use strict';

	function BearerStrategy (app, config) {

		this.provider = 'google';

		config = _.extend({
			authorize: {},
			logout: {}
		}, config);

		this.actions = {
			authorize: new BearerAuthorize(config.authorize),
			logout: new BearerLogout(config.logout)
		};

		this.steps = {
			compareToken: new BearerCompareToken(config.compareToken)
		};

	}

	return BearerStrategy;

})();
