var PassportLocal = require('passport-local').Strategy;
var passport = require('passport');

var _ = require('underscore');

module.exports = (function () {
	'use strict';

	function LocalLogin (config) {

		config = _.extend({}, config);

		passport.use(
			'local-login',
			new PassportLocal(
				config
				// LOGIN LOGIC
			)
		);

	}

	return LocalLogin;

})();
