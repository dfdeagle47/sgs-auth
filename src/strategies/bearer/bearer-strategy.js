var BearerAuthorize = require('./actions/bearer-authorize');
var BearerLogout = require('./actions/bearer-logout');

var BearerRemoveInvalidTokens = require('./steps/bearer-remove-invalid-tokens');
var BearerRemoveAccounts = require('./steps/bearer-remove-accounts');
var BearerRemoveAccount = require('./steps/bearer-remove-account');
var BearerCompareToken = require('./steps/bearer-compare-token');
var BearerCreateToken = require('./steps/bearer-create-token');
var BearerAddAccount = require('./steps/bearer-add-account');
var BearerHashToken = require('./steps/bearer-hash-token');

var _ = require('underscore');

module.exports = (function () {
	'use strict';

	function BearerStrategy (config) {

		this.provider = 'google';

		config = _.extend({
			authorize: {},
			logout: {}
		}, config);

		this.actions = {
			authorize: new BearerAuthorize(config.authorize),
			logout: new BearerLogout(config.logout)
		};

		this.steps = {
			removeInvalidTokens: new BearerRemoveInvalidTokens({}),
			removeBearerAccounts: new BearerRemoveAccounts({}),
			removeBearerAccount: new BearerRemoveAccount({}),
			addBearerAccount: new BearerAddAccount({}),
			compareToken: new BearerCompareToken({}),
			createToken: new BearerCreateToken({}),
			hashToken: new BearerHashToken({})
		};

	}

	return BearerStrategy;

})();
