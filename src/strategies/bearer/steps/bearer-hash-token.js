var AuthError = require('../../../errors/auth-error');
var Hash = require('sgs-crypto').Hash;

var _ = require('underscore');

module.exports = (function () {
	'use strict';

	function BearerHashToken (config) {

		config = _.extend({}, config);

		return function (mixin, callback) {
			var token = mixin.dataOut.token;

			Hash.hashToken(token, function (e, tokenHash) {
				if(e) {
					return callback(
						new AuthError({
							step: 'hashToken',
							message: 'TOKEN_HASHING_ERROR'
						})
					);
				}

				mixin.dataOut.tokenHash = tokenHash;

				callback(null, mixin);
			});
		};

	}

	return BearerHashToken;

})();
