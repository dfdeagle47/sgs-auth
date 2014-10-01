var Users = [{
	id: 0,
	state: 'registered',
	accounts: [{
		expiration: new Date(8640000000000000),
		strategy: 'local',

		password: '$2a$10$ipckRAzgF52Z1W4dGmiAl.6SxGCEHPQPIvlREqEQ56ffXlmaASEVy',
		email: 'test@example.com',
	}]
}];

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
				mixin.stateIn = user.state;
			}

			mixin.user = user;

			callback(null, mixin);
		},

		saveUser: function (mixin, callback) {
			var user = mixin.user;
			user.accounts = mixin.accounts;
			user.state = mixin.stateOut;

			Users[user.id] = user;

			callback(null, mixin);
		}

	};

})();
