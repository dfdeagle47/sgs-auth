var _ = require('underscore');

module.exports = (function () {
	'use strict';

	function LocalVerifyEmail (config) {

		this.config = _.extend({}, config);

		this.name = 'local-verify-email';

	}

	return LocalVerifyEmail;

})();
