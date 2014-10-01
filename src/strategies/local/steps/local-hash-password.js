var AuthError = require('../../../../errors/auth-error');
var Hash = require('sgs-crypto').Hash;

module.exports = (function () {
	'use strict';

	function LocalHashPassword (mixin, callback) {

		var password = mixin.dataIn.password;

		Hash.hashPassword(password, function (e, passwordHash) {
			if(e) {
				return callback(
					new AuthError({
						step: 'hashPassword',
						message: 'HASHING_ERROR'
					})
				);
			}

			mixin.dataOut.passwordHash = passwordHash;

			callback(null, mixin);
		});

	}

	return LocalHashPassword;

})();
