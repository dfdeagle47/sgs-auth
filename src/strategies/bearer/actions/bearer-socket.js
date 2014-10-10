var passport = require('passport');
var util = require('util');
var _ = require('underscore');

module.exports = (function () {
	'use strict';

	/**
	 * PARSER - STARTER
	 */

	function PassportSocket (options, verify) {

		passport.Strategy.call(this);

		this._verify = verify;

	}

	util.inherits(PassportSocket, passport.Strategy);

	PassportSocket.prototype.authenticate = function (handshakeData) {
		var query = handshakeData.query || handshakeData._query;
		var token = query.Authorization;

		this._verify(token, function (e, user) {
			if(e) {
				return this.error(e);
			}

			this.success(user);
		}.bind(this));
	};

	/**
	 * PARSER - END
	 */

	function BearerSocket (config) {

		this.config = _.extend({}, config);

	}

	BearerSocket.prototype.passportStrategy = PassportSocket;

	BearerSocket.prototype.name = 'bearer-socket';

	BearerSocket.prototype.stateIn = [
		'registered'
	];

	BearerSocket.prototype.stateOut = 'registered';

	BearerSocket.prototype.steps = [
		'hashToken',

		'findUserByToken',

		'validateState'
	];

	BearerSocket.prototype.mapper = function (token, callback) {
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

	return BearerSocket;

})();
