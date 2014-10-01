var CommonValidateState = require('./common-validate-state');
var CommonUpdateState = require('./common-update-state');

module.exports = (function () {
	'use strict';

	var CommonSteps = {
		validateState: new CommonValidateState({}),
		updateState: new CommonUpdateState({})
	};

	return CommonSteps;

})();
