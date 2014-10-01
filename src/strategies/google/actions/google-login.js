var PassportGoogle = require('passport-google-oauth').OAuth2Strategy;
var passport = require('passport');

var _ = require('underscore');

module.exports = (function () {
	'use strict';

	function GoogleLogin (config) {

		this.config = _.extend({}, config);

		this.name = 'google-login';

		passport.use(
			this.name,
			new PassportGoogle(
				config,
				this.run.bind(this)
			)
		);

		return passport.authenticate(this.name, {
			session: false
		});

	}

	GoogleLogin.prototype.run = function (accessToken, refreshToken, rawToken, profile, callback) {
		callback(null, false);
	};

	return GoogleLogin;

})();
