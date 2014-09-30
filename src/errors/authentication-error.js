var util = require('util');
var _ = require('underscore');

module.exports = (function () {
	'use strict';

	function AuthenticationError (properties) {

		Error.call(this);

		this.type = 'AuthenticationError';

		properties = _.extend({
			step: null,
			action: null,
			message: null,
			strategy: null
		}, properties);

		_.extend(this, properties);

	}

	util.inherits(AuthenticationError, Error);

	return AuthenticationError;

})();
