var AuthError = require('../../../../errors/auth-error');
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
						new AuthError({
							step: 'compareToken',
							message: 'COMPARISON_ERROR'
						})
					);				
				}

				if(match !== true) {
					return callback(
						new AuthError({
							step: 'compareToken',
							message: 'TOKENS_DONT_MATCH'
						})
					);
				}

				callback(null, accounts, data);
			});
		};

	}

	return BearerCompareToken;

})();
