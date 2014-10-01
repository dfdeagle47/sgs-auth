var PassportBearer = require('passport-http-bearer').Strategy;
var passport = require('passport');

var _ = require('underscore');

module.exports = (function () {
	'use strict';

	function BearerAuthorize (config) {

		this.config = _.extend({}, config);

		this.name = 'bearer-authorize';

	}

	return BearerAuthorize;

})();
