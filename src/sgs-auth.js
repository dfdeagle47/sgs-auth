var FacebookStrategy = require('./strategies/facebook/facebook-strategy');
var GoogleStrategy = require('./strategies/google/google-strategy');
var BearerStrategy = require('./strategies/bearer/bearer-strategy');
var LocalStrategy = require('./strategies/local/local-strategy');

var CommonSteps = require('./common-steps/common-steps');

var passport = require('passport');
var async = require('async');
var _ = require('underscore');

module.exports = (function () {
	'use strict';

	function SGSAuth () {}

	SGSAuth.prototype.init = function (Delegates, config) {

		var me = this;

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
			Delegates
		);

		_.each(this.strategies, function (strategy) {
			return _.extend(me.steps, strategy.steps);
		});

		_.each(this.strategies, function (strategy) {
			_.each(strategy.actions, function (action) {
				passport.use(
					action.name,
					new (action.passportStrategy)(
						action.config,
						me.run(action)
					)
				);
			});
		});

	};

	SGSAuth.prototype.with = function (strategyName, actionName) {
		return function (req, res, next) {
			return passport.authenticate(strategyName + '-' + actionName, {
				session: false
			})(req, res, function () {

				req.auth = _.extend({}, req.user.data);

				req.user = req.user.user;
				delete req.user.user;

				next();
			});
		};
	};

	SGSAuth.prototype.run = function (action) {
		var steps = _.map(action.steps, function (stepName) {
			return this.steps[stepName];
		}.bind(this));

		return function () {
			var args = Array.apply(null, arguments);
			var callback = args.pop();

			var initializer = function (cb) {
				return cb.apply(null, [null].concat(args));
			};

			async.waterfall(
				[].concat(
					initializer,
					action.mapper.bind(action),
					steps
				),
				callback
			);
		};
	};

	return new SGSAuth();

})();
