var PassportBearer = require('passport-http-bearer').Strategy;

var _ = require('underscore');

module.exports = (function () {
	'use strict';

	function BearerAuthorize (config) {

		this.config = _.extend({}, config);

	}

	BearerAuthorize.prototype.passportStrategy = PassportBearer;

	BearerAuthorize.prototype.name = 'bearer-authorize';

	BearerAuthorize.prototype.stateIn = [
		'registered'
	];

	BearerAuthorize.prototype.stateOut = 'registered';

	BearerAuthorize.prototype.steps = [
		'hashToken',

		'findUserByToken',

		'validateState'
	];

	BearerAuthorize.prototype.parser = null;

	BearerAuthorize.prototype.mapper = function (token, callback) {
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

	return BearerAuthorize;

})();
