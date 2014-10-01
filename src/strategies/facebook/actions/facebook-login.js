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
				config,
				this.run.bind(this)
			)
		);

		return passport.authenticate(this.name, {
			session: false
		});

	}

	FacebookLogin.prototype.run = function (accessToken, refreshToken, rawToken, profile, callback) {
		callback(null, false);
	};

	return FacebookLogin;

})();
