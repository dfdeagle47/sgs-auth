var PassportGoogle = require('passport-google-oauth').OAuth2Strategy;
var passport = require('passport');

var _ = require('underscore');

module.exports = (function () {
	'use strict';

	function GoogleLogin (config) {

		config = _.extend({}, config);

		passport.use(
			'google-login',
			new PassportGoogle(
				config
				// LOGIN LOGIC
			)
		);

	}

	return GoogleLogin;

})();
