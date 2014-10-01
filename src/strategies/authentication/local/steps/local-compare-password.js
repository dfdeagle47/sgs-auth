var AuthError = require('../../../../errors/auth-error');
var Hash = require('sgs-crypto').Hash;

var _ = require('underscore');

module.exports = (function () {
	'use strict';

	function LocalComparePassword (config) {

		config = _.extend({}, config);

		return function (accounts, data, callback) {
			var account = accounts[0];
			var password = data.password;
			var passwordHash = account.password;

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

				callback(null, accounts, data);
			});
		};

	}

	return LocalComparePassword;

})();
