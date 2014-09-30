var AuthenticationError = require('../../../../errors/authentication-error');
var Hash = require('sgs-crypto').Hash;

var async = require('async');
var _ = require('underscore');

module.exports = (function () {
	'use strict';

	function BearerCompareToken (config) {

		config = _.extend({}, config);

		return function (accounts, data, callback) {
			var token = data.token;

			async.reduce(accounts, false, function (match, account, cb) {
				var tokenHash = account.token;
				if(match !== false) {
					return cb(match);
				}
				Hash.compareToken(token, tokenHash, cb);
			}, function (e, match) {
				if(e) {
					return callback(
						new AuthenticationError({
							step: 'compareToken',
							message: 'COMPARISON_ERROR'
						})
					);				
				}

				if(match !== true) {
					return callback(
						new AuthenticationError({
							step: 'compareToken',
							message: 'TOKENS_DONT_MATCH'
						})
					);
				}

				return callback(null, accounts, data);
			});
		};

	}

	return BearerCompareToken;

})();
