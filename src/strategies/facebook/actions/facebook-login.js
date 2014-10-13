var PassportFacebook = require('passport-facebook').Strategy;
var passport = require('passport');

var _ = require('underscore');

module.exports = (function () {
	'use strict';

	function FacebookLogin (config) {

		this.config = _.extend({}, config);

	}

	FacebookLogin.prototype.passportStrategy = PassportFacebook;

	FacebookLogin.prototype.name = 'facebook-login';

	FacebookLogin.prototype.stateIn = [
		'registered'
	];

	FacebookLogin.prototype.stateOut = 'registered';

	FacebookLogin.prototype.steps = [
		'findOrCreateUserByOAuthId',

		'addFacebookAccount',

		'createToken',
		'hashToken',
		'addBearerAccount',
		'removeInvalidTokens',

		'updateState',

		'saveUser'
	];

	FacebookLogin.prototype.mapper = function (accessToken, refreshToken, rawResponse, callback) {
		var mixin = {
			user: null,
			specs: {
				stateIn: this.stateIn,
				stateOut: this.stateOut
			},
			data: {
				oauthId: rawResponse.id,
				profile: rawResponse,
				accessToken: accessToken,
			},
			accounts: []
		};

		return callback(null, mixin);
	};

	return FacebookLogin;

})();
