var PassportBearer = require('passport-http-bearer').Strategy;
var passport = require('passport');

var _ = require('underscore');

module.exports = (function () {
	'use strict';

	function BearerAuthorize (config) {

		config = _.extend({}, config);

		passport.use(
			'bearer-authorize',
			new PassportBearer(
				config
				// AUTHORIZE LOGIC
			)
		);

	}

	return BearerAuthorize;

})();
