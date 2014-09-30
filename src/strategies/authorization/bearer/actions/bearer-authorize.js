var PassportBearer = require('passport-http-bearer').Strategy;
var passport = require('passport');

var _ = require('underscore');

module.exports = (function () {
	'use strict';

	function BearerAuthorize (config) {

		config = _.extend({}, config);

		this.name = 'bearer-authorize';

		passport.use(
			this.name,
			new PassportBearer(
				config
				// AUTHORIZE LOGIC
			)
		);

		return passport.authenticate(this.name, {
			session: false
		});

	}

	return BearerAuthorize;

})();
