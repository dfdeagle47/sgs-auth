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
				config,
				this.run.bind(this)
			)
		);

		return passport.authenticate(this.name, {
			session: false
		});

	}

	BearerAuthorize.prototype.run = function (accessToken, refreshToken, rawToken, profile, callback) {
		callback(null, false);
	};

	return BearerAuthorize;

})();
