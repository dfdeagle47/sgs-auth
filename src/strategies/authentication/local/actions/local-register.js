var _ = require('underscore');

module.exports = (function () {
	'use strict';

	function LocalRegister (config) {

		config = _.extend({}, config);

		this.name = 'local-register';

	}

	return LocalRegister;

})();
