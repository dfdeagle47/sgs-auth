var AuthError = require('../errors/auth-error');

var _ = require('underscore');

module.exports = (function () {
	'use strict';

	function CommonValidateState (config) {

		config = _.extend({}, config);

		return function (mixin, callback) {
			var expectedStateIn = mixin.specs.stateIn;
			var stateIn = mixin.stateIn;

			if(!~expectedStateIn.indexOf(stateIn)) {
				return callback(
					new AuthError({
						step: 'validateState',
						message: 'STATE_DOESNT_MATCH'
					})
				);
			}

			callback(null, mixin);
		};

	}

	return CommonValidateState;

})();
