var DatabaseDelegate = require('../delegates/database-delegate');

var async = require('async');
var _ = require('underscore');

module.exports = (function () {
	'use strict';

	function Action () {}

	Action.prototype.run = function () {
		var me = this;

		return function () {
			var args = Array.apply(null, arguments); // TODO
			var callback = args.pop();

			async.waterfall([
				function (cb) {
					me.find(args, cb);
				},
				function (accounts, cb) {
					cb((accounts || '').length ? null : 'NO_USER_FOUND', accounts);
				},
				function (accounts, cb) {
					var steps = me.wrapSteps(accounts, me.steps);
					async.waterfall(steps, cb);
				},
				function (accounts, cb) {
					me.save(accounts, cb);
				}
			], function (e, user) {
				if(e === 'NO_USER_FOUND') {
					return callback(null, false);
				}

				if(e) {
					return callback(e);
				}

				return callback(null, user);
			});
		};
	};

	Action.prototype.find = function (args, callback) { // TODO select fields
		DatabaseDelegate.find({
			field: '',
			value: '',
			strategy: '',
		}, callback);
	};

	Action.prototype.save = function (accounts, callback) { // TODO pass user too
		DatabaseDelegate.save(accounts, callback);
	};

	Action.prototype.wrapSteps = function (accounts, steps) {
		return _.map(steps, function (step) {
			return function (accounts, cb) {
				var filteredAccounts = _.filter(accounts, function (account) {
					return account.strategy === step.strategy;
				});
				step.method(filteredAccounts, cb);
			};
		});
	};

	return Action;

})();
