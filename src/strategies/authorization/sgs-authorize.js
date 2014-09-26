var BearerStrategy = require('./bearer/bearer-strategy');

var _ = require('underscore');

module.exports = (function () {
	'use strict';

	function SGSAuthorize (config) {

		config = _.extend({
			bearer: {}
		}, config);

		this.strategies = {
			bearer: new BearerStrategy(config.bearer)
		};

	}

	SGSAuthorize.prototype.with = function (strategyName, actionName) {
		return this.strategies[strategyName].actions[actionName];
	};

	return SGSAuthorize;

})();
