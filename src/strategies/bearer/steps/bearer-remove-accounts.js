var _ = require('underscore');

module.exports = (function () {
	'use strict';

	function BearerRemoveAccounts (config) {

		config = _.extend({}, config);

		return function (mixin, callback) {
			mixin.accounts = mixin.accounts.filter(function (account) {
				return account.strategy !== 'bearer';
			});

			callback(null, mixin);
		};

	}

	return BearerRemoveAccounts;

})();
