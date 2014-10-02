var _ = require('underscore');

module.exports = (function () {
	'use strict';

	function BearerRemoveToken (config) {

		config = _.extend({}, config);

		return function (mixin, callback) {
			var hashedToken = mixin.data.tokenHash;

			mixin.accounts = mixin.accounts.filter(function (account) {
				return account.token !== hashedToken;
			});

			callback(null, mixin);
		};

	}

	return BearerRemoveToken;

})();
