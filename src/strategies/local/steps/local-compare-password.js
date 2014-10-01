var AuthError = require('../../../../errors/auth-error');
var Hash = require('sgs-crypto').Hash;

module.exports = (function () {
	'use strict';

	function LocalComparePassword (mixin, callback) {

		var localAccountIn = mixin.accounts.filter(function (account) {
			return account.strategy === 'local';
		})[0];

		var passwordHash = localAccountIn.password;
		var password = mixin.dataIn.password;

		Hash.comparePassword(password, passwordHash, function (e, match) {
			if(e) {
				return callback(
					new AuthError({
						step: 'comparePassword',
						message: 'COMPARISON_ERROR'
					})
				);
			}

			if(match !== true) {
				return callback(
					new AuthError({
						step: 'comparePassword',
						message: 'PASSWORD_DOESNT_MATCH'
					})
				);
			}

			callback(null, mixin);
		});

	}

	return LocalComparePassword;

})();
