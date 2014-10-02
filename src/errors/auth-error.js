var util = require('util');
var _ = require('underscore');

module.exports = (function () {
	'use strict';

	function AuthError (properties) {

		Error.call(this);

		_.extend(
			this,
			_.defaults(properties, {
				type: 'AuthError',
				step: null,
				action: null,
				message: null,
				strategy: null
			})
		);

	}

	util.inherits(AuthError, Error);

	return AuthError;

})();
