var CommonValidateState = require('./common-validate-state');

module.exports = (function () {
	'use strict';

	var CommonSteps = {
		validateState: new CommonValidateState()
	};

	return CommonSteps;

})();
