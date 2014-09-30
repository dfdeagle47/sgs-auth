module.exports = (function () {
	'use strict';

	function DatabaseDelegate () {}

	DatabaseDelegate.prototype.find = null;

	DatabaseDelegate.prototype.save = null;

	return new DatabaseDelegate();

})();
