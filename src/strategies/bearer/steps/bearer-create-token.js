var AuthError = require('../../../errors/auth-error');
var Hash = require('sgs-crypto').Hash;

var _ = require('underscore');

module.exports = (function () {
	'use strict';

	function BearerCreateToken (config) {

		config = _.extend({}, config);

		return function (mixin, callback) {
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
		};

	}

	return BearerCreateToken;

})();
