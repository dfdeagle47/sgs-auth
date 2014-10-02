var _ = require('underscore');

module.exports = (function () {
	'use strict';

	function BearerRemoveAccount (config) {

		config = _.extend({}, config);

		return function (mixin, callback) {
			var hashedToken = mixin.data.tokenHash;

			mixin.accounts = mixin.accounts.filter(function (account) {
				return !(account.token === hashedToken && account.strategy === 'bearer');
			});

			callback(null, mixin);
		};

	}

	return BearerRemoveAccount;

})();
