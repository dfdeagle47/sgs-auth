var FacebookStrategy = require('./strategies/facebook/facebook-strategy');
var GoogleStrategy = require('./strategies/google/google-strategy');
var BearerStrategy = require('./strategies/bearer/bearer-strategy');
var LocalStrategy = require('./strategies/local/local-strategy');

var CommonSteps = require('./common-steps/common-validate-state');

var async = require('async');
var _ = require('underscore');

module.exports = (function () {
	'use strict';

	function SGSAuth (Delegates, config) {

		config = config || {};

		this.strategies = _.object(
			_.map(
				_.pick({
					facebook: FacebookStrategy,
					google: GoogleStrategy,
					bearer: BearerStrategy,
					local: LocalStrategy
				}, Object.keys(config)),
				function (Strategy, strategyName) {
					return [
						strategyName,
						new Strategy(config[strategyName])
					];
				}
			)
		);

		this.steps = _.extend(
			{},
			CommonSteps,
			Delegates,
			_.map(this.strategies, function (strategy) {
				return strategy.steps;
			})
		);

	}

	SGSAuth.prototype.with = function (strategyName, actionName) {
		return this.strategies[strategyName].actions[actionName];
	};

	SGSAuth.prototype.run = function (stepNames) {
		var steps = _.map(stepNames, function (stepName) {
			return this.steps[stepName];
		}.bind(this));

		return function () {
			var args = Array.apply(null, arguments);
			var callback = args.pop();
			var initializeData = function (cb) {
				return cb.apply(null, [null].concat(args));
			};
			async.waterfall([initializeData].concat(steps), callback);
		};
	};

	return SGSAuth;

})();
