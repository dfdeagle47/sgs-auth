var _ = require('underscore');

module.exports = (function () {
	'use strict';

	function GoogleAddAccount (config) {

		config = _.extend({}, config);

		return function (mixin, callback) {
			// Expiration is set to a date very far in the future.
			// Google strategy accounts should expire bug currently has a bug
			// due to a new version of the Google OAuth API.
			var expiration = new Date(8640000000000000);

			if(mixin.stateIn === 'initial') {

				var newGoogleAccount = {
					expiration: expiration,
					strategy: 'google',

					oauthId: mixin.data.oauthId,
					accessToken: mixin.data.accessToken,
				};

				mixin.stateOut = 'registered';

				mixin.accounts.unshift(newGoogleAccount);

			}

			callback(null, mixin);
		};

	}

	return GoogleAddAccount;

})();
