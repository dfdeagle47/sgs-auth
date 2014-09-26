var BearerAuthorize = require('./bearer-authorize');

var _ = require('underscore');

module.exports = (function () {
	'use strict';

	function BearerStrategy (app, config) {

		this.provider = 'google';

		config = _.extend({
			authorize: {}
		}, config);

		this.authorize = new BearerAuthorize(config.authorize);

	}

	return BearerStrategy;

})();
