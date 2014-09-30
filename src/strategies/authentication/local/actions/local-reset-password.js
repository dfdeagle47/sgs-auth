var _ = require('underscore');

module.exports = (function () {
	'use strict';

	function LocalResetPassword (config) {

		config = _.extend({}, config);

		this.name = 'local-reset-password';

	}

	return LocalResetPassword;

})();
