var _ = require('underscore');

module.exports = (function () {
	'use strict';

	function LocalRemoveAccount (config) {

		config = _.extend({}, config);

		return function (mixin, callback) {
			var username = mixin.data.username;

			mixin.accounts = mixin.accounts.filter(function (account) {
				return !(account.username === username && account.strategy === 'local');
			});

			callback(null, mixin);
		};

	}

	return LocalRemoveAccount;

})();
