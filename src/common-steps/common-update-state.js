var _ = require('underscore');

module.exports = (function () {
	'use strict';

	function CommonUpdateState (config) {

		config = _.extend({}, config);

		return function (mixin, callback) {
			var updatedStateOut = mixin.specs.stateOut;

			mixin.stateOut = updatedStateOut;

			callback(null, mixin);
		};

	}

	return CommonUpdateState;

})();
