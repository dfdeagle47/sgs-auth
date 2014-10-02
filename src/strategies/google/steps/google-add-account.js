var _ = require('underscore');

module.exports = (function () {
	'use strict';

	function GoogleAddAccount (config) {

		config = _.extend({}, config);

		return function (mixin, callback) {
			var expiration = mixin.data.expiration;

			if(mixin.stateIn === 'initial') {

				var newGoogleAccount = {
					expiration: expiration,
					strategy: 'google',

					oauthId: mixin.data.oauthId,
					accessToken: mixin.data.accessToken,
					refreshToken: mixin.data.refreshToken
				};

				mixin.stateOut = 'registered';

				mixin.accounts.push(newGoogleAccount);

			}

			callback(null, mixin);
		};

	}

	return GoogleAddAccount;

})();
