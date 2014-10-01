var AuthError = require('../../../../errors/auth-error');
var Hash = require('sgs-crypto').Hash;

var _ = require('underscore');

module.exports = (function () {
	'use strict';

	function BearerCreateToken (config) {

		config = _.extend({}, config);

		return function (accounts, data, callback) {
			Hash.genereateToken(function (e, token) {
				if(e) {
					callback(
						new AuthError({
							step: 'createToken',
							message: 'TOKEN_CREATION_ERROR'
						})
					);
				}

				data.token = token;

				callback(null, accounts, data);
			});
		};

	}

	return BearerCreateToken;

})();
