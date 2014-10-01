var Users = [];

module.exports = (function () {
	'use strict';

	return {

		findUserByUsername: function (mixin, callback) {
			var username = mixin.data.username;

			var users = Users.filter(function (user) {
				return !!user.accounts.filter(function (account) {
					return account.username === username && account.strategy === 'local';
				}).length;
			});

			if(!(users && users.length)) {
				// return callback('NO_USER');
				return callback(null, mixin);
			}

			var user = users[0];

			mixin.accounts = user.accounts;
			mixin.stateIn = user.state;

			mixin.user = user;

			callback(null, mixin);
		},

		findUserByToken: function (mixin, callback) {
			var hashedToken = mixin.data.tokenHash;

			var users = Users.filter(function (user) {
				return !!user.accounts.filter(function (account) {
					return account.token === hashedToken && account.strategy === 'bearer';
				}).length;
			});

			if(!(users && users.length)) {
				// return callback('NO_USER');
				return callback(null, mixin);
			}

			var user = users[0];

			mixin.accounts = user.accounts;
			mixin.stateIn = user.state;

			mixin.user = user;

			callback(null, mixin);
		},

		createUser: function (mixin, callback) {
			var user = {};
			user.accounts = mixin.accounts;
			user.state = mixin.stateOut;
			user.id = Users.length;

			Users.push(user);

			mixin.user = user;

			callback(null, mixin);
		},

		saveUser: function (mixin, callback) {
			var user = mixin.user;
			user.accounts = mixin.accounts;
			user.state = mixin.stateOut;

			Users[user.id] = user;

			mixin.user = user;

			callback(null, mixin);
		}

	};

})();
