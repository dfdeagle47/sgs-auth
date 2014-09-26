var SGSAuthenticate = require('./strategies/authentication/sgs-authenticate');
var SGSAuthorize = require('./strategies/authorization/sgs-authorize');

module.exports = (function () {
	'use strict';

	function SGSAuthentication () {}

	SGSAuthentication.prototype.init = function (config) {
		this.Authenticate = new SGSAuthenticate(config);
		this.Authorize = new SGSAuthorize(config);
	};

	SGSAuthentication.prototype.Authenticate = null;

	SGSAuthentication.prototype.Authorize = null;

	return new SGSAuthentication();

})();
