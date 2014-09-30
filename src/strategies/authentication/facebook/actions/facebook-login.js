var PassportFacebook = require('passport-facebook').Strategy;
var passport = require('passport');

var _ = require('underscore');

module.exports = (function () {
	'use strict';

	function FacebookLogin (config) {

		config = _.extend({}, config);

		this.name = 'google-login';

		passport.use(
			'facebook-login',
			new PassportFacebook(
				config
				// LOGIN LOGIC
			)
		);

		return passport.authenticate(this.name, {
			session: false
		});

	}

	return FacebookLogin;

})();
