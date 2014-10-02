var PassportBearer = require('passport-http-bearer').Strategy;

var _ = require('underscore');

module.exports = (function () {
	'use strict';

	function BearerLogout (config) {

		this.config = _.extend({}, config);

	}

	BearerLogout.prototype.passportStrategy = PassportBearer;

	BearerLogout.prototype.name = 'bearer-logout';

	BearerLogout.prototype.stateIn = [
		'registered'
	];

	BearerLogout.prototype.stateOut = 'registered';

	BearerLogout.prototype.steps = [
		'hashToken',

		'findUserByToken',

		'validateState',

		'removeBearerAccount',
		'removeInvalidTokens',

		'updateState',

		'saveUser'
	];

	BearerLogout.prototype.mapper = function (token, callback) {
		var mixin = {
			user: null,
			specs: {
				stateIn: this.stateIn,
				stateOut: this.stateOut
			},
			data: {
				token: token
			},
			accounts: []
		};

		return callback(null, mixin);
	};


	return BearerLogout;

})();
