var AuthError = require('../errors/auth-error');

module.exports = (function () {
	'use strict';

	function CommonValidateState (mixin, callback) {

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

	}

	return CommonValidateState;

})();
