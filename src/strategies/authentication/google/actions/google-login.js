var PassportGoogle = require('passport-google-oauth').OAuth2Strategy;
var passport = require('passport');

var _ = require('underscore');

module.exports = (function () {
	'use strict';

	function GoogleLogin (config) {

		config = _.extend({}, config);

		this.name = 'google-login';

		passport.use(
			this.name,
			new PassportGoogle(
				config
				// LOGIN LOGIC
			)
		);

		return passport.authenticate(this.name, {
			session: false
		});

	}

	return GoogleLogin;

})();
