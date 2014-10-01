var passport = require('passport');
var util = require('util');

var _ = require('underscore');

module.exports = (function () {
	'use strict';

	// function PassportChangePassword (options, verify) {

	// 	this._verify = verify;

	// }

	// util.inherits(PassportChangePassword, passport.Strategy);

	// PassportChangePassword.prototype.authenticate = function (req, options) {
	// 	if(!req.body || !req.body.password || !req.body.newPassword) {
	// 		return this.fail(401);
	// 	}

	// 	var newPassword = req.body.newPassword;
	// 	var password = req.body.password;

	// 	var me = this;

	// 	this._verify(password, newPassword, function (e, user) {
	// 		if(e) {
	// 			return me.error(e);
	// 		}

	// 		if(!user) {
	// 			return me.fail();
	// 		}

	// 		me.success(user);
	// 	});
	// };

	function LocalChangePassword (config) {

		config = _.extend({}, config);

		this.name = 'local-change-password';

		// passport.use(
		// 	this.name,
		// 	new PassportChangePassword(
		// 		config,
		// 		this.run.bind(this)
		// 	)
		// );

		// return passport.authenticate(this.name, {
		// 	session: false
		// });

	}

	return LocalChangePassword;

})();
