var _ = require('underscore');

module.exports = (function () {
	'use strict';

	function BearerRemoveInvalidTokens (config) {

		config = _.extend({}, config);

		return function (mixin, callback) {
			// Maximum tokens is set to 10 concurrent clients.
			// This paramter will be configurable in the future.
			var maxTokens = 10;

			var bearerAccounts = [];
			mixin.accounts = mixin.accounts.filter(function (account) {
				if(account.strategy === 'bearer') {

					if(account.expiration > Date.now()) {
						bearerAccounts.push(account);
					}

					return false;
				}

				return true;
			});

			bearerAccounts.sort(function (accountA, accountB) {
				return accountB.expiration - accountA.expiration;
			}).splice(maxTokens);

			mixin.accounts = mixin.accounts.concat(bearerAccounts);

			callback(null, mixin);
		};

	}

	return BearerRemoveInvalidTokens;

})();
