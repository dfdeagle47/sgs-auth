var _ = require('underscore');

module.exports = (function () {
	'use strict';

	function LocalChangePassword (config) {

		config = _.extend({}, config);

		this.name = 'local-change-password';

	}

	return LocalChangePassword;

})();
