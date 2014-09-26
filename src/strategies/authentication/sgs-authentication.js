var FacebookStrategy = require('./facebook/facebook-strategy');
var GoogleStrategy = require('./google/google-strategy');
var LocalStrategy = require('./local/local-strategy');

var _ = require('underscore');

module.exports = (function () {
	'use strict';

	function SGSAuthentication (config) {

		config = _.extend({
			facebook: {},
			google: {},
			local: {}
		}, config);

		this.strategies = {
			facebook: new FacebookStrategy(config.facebook),
			google: new GoogleStrategy(config.google),
			local: new LocalStrategy(config.local)
		};

	}

	SGSAuthentication.prototype.with = function (strategyName, actionName) {
		return this.strategies[strategyName].actions[actionName];
	};

	return SGSAuthentication;

})();
