module.exports = (function () {
	'use strict';

	function LocalAddAccount (mixin, callback) {

		// Expiration is set to a date very far in the future.
		// Local strategy accounts don't expire.
		var expiration = new Date(8640000000000000);

		var newBearerAccount = {
			email: mixin.dataIn.email,
			password: mixin.dataOut.passwordHash,
			strategy: 'local',
			expiration: expiration
		};

		mixin.accounts.push(newBearerAccount);

		callback(null, mixin);

	}

	return LocalAddAccount;

})();
