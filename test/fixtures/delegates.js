var Users = [];

module.exports = (function () {
	'use strict';

	return {

		findUserByUsername: function (mixin, callback) {
			var username = mixin.username;

			var users = Users.filter(function (user) {
				return !!user.accounts.filter(function (account) {
					return account.email === username && account.strategy === 'local';
				});
			});

			var user = null;
			if(users && users.length) {
				user = users[0];

				mixin.accounts = user.accounts;
			}

			mixin.user = user;

			callback(null, mixin);
		}

	};

})();
