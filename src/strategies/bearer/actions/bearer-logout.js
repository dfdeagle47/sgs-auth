var _ = require('underscore');

module.exports = (function () {
	'use strict';

	function BearerLogout (config) {

		config = _.extend({}, config);

		this.name = 'bearer-logout';

	}

	return BearerLogout;

})();