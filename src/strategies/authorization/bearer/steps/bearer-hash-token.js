var AuthError = require('../../../../errors/auth-error');
var Hash = require('sgs-crypto').Hash;

var _ = require('underscore');

module.exports = (function () {
	'use strict';

	function BearerHashToken (config) {

		config = _.extend({}, config);

		return function (accounts, data, callback) {
			var token = data.token;

			Hash.hashToken(token, function (e, tokenHash) {
				if(e) {
					callback(
						new AuthError({
							step: 'hashToken',
							message: 'TOKEN_HASHING_ERROR'
						})
					);
				}

				data.tokenHash = tokenHash;

				callback(null, accounts, data);
			});
		};

	}

	return BearerHashToken;

})();
