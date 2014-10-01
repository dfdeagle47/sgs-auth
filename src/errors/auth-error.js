var util = require('util');
var _ = require('underscore');

module.exports = (function () {
	'use strict';

	function AuthError (properties) {

		Error.call(this);

		this.type = 'AuthError';

		properties = _.extend({
			step: null,
			action: null,
			message: null,
			strategy: null
		}, properties);

		_.extend(this, properties);

	}

	util.inherits(AuthError, Error);

	return AuthError;

})();
