var _ = require('underscore');

module.exports = (function () {
	'use strict';

	function LocalAddAccount (config) {

		config = _.extend({}, config);

		return function (mixin, callback) {
			// Expiration is set to a date very far in the future.
			// Local strategy accounts don't expire.
			var expiration = new Date(8640000000000000);

			var newLocalAccount = {
				expiration: expiration,
				strategy: 'local',

				password: mixin.data.passwordHash,
				username: mixin.data.username
			};

			mixin.stateOut = 'initial';

			mixin.accounts.unshift(newLocalAccount);

			callback(null, mixin);
		};

	}

	return LocalAddAccount;

})();
