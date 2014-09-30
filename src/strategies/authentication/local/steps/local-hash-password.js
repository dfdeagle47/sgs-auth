var AuthenticationError = require('../../../../errors/authentication-error');
var Hash = require('sgs-crypto').Hash;

var _ = require('underscore');

module.exports = (function () {
	'use strict';

	function LocalHashPassword (config) {

		config = _.extend({}, config);

		return function (accounts, data, callback) {
			var account = accounts[0];
			var password = data.password;

			Hash.hashPassword(password, function (e, passwordHash) {
				if(e) {
					return callback(
						new AuthenticationError({
							step: 'hashPassword',
							message: 'HASHING_ERROR'
						})
					);
				}

				data.password = passwordHash;

				return callback(null, accounts, data);
			});
		};

	}

	return LocalHashPassword;

})();
