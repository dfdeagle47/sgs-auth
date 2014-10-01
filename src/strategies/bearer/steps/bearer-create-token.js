var AuthError = require('../../../../errors/auth-error');
var Hash = require('sgs-crypto').Hash;

module.exports = (function () {
	'use strict';

	function BearerCreateToken (mixin, callback) {

		Hash.genereateToken(function (e, token) {
			if(e) {
				return callback(
					new AuthError({
						step: 'createToken',
						message: 'TOKEN_CREATION_ERROR'
					})
				);
			}

			mixin.dataOut.token = token;

			callback(null, mixin);
		});

	}

	return BearerCreateToken;

})();
