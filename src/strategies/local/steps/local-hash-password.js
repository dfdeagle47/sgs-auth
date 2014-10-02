var AuthError = require('../../../errors/auth-error');
var Hash = require('sgs-crypto').Hash;

var _ = require('underscore');

module.exports = (function () {
	'use strict';

	function LocalHashPassword (config) {

		config = _.extend({}, config);

		return function (mixin, callback) {
			var password = mixin.data.newPassword || mixin.data.password;

			Hash.hashPassword(password, function (e, passwordHash) {
				if(e) {
					return callback(
						new AuthError({
							step: 'hashPassword',
							message: 'HASHING_ERROR'
						})
					);
				}

				mixin.data.passwordHash = passwordHash;

				callback(null, mixin);
			});
		};

	}

	return LocalHashPassword;

})();
