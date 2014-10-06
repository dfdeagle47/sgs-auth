var Users = [];

module.exports = (function () {
	'use strict';

	return {

		findOrCreateUserByOAuthId: function (mixin, callback) {
			var provider = mixin.data.profile.provider;
			var oauthId = mixin.data.oauthId;

			var users = Users.filter(function (user) {
				return !!user.accounts.filter(function (account) {
					return account.oauthId === oauthId && account.strategy === provider;
				}).length;
			});		

			var user = null;	

			if(users && users.length) {
				user = users[0];
			}
			else {
				user = {};
				user.state = 'initial';
				user._id = Users.length;

				Users.push(user);
			}

			// mixin.accounts = user.accounts;
			mixin.stateIn = user.state;
			mixin.user = user;

			callback(null, mixin);
		},

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

		findUserById: function (mixin, callback) {
			var _id = mixin.data._id;

			var users = Users.filter(function (user) {
				return user._id === _id;
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
			user._id = Users.length;

			Users.push(user);

			mixin.user = user;

			callback(null, mixin);
		},

		saveUser: function (mixin, callback) {
			var user = mixin.user;
			user.accounts = mixin.accounts;
			user.state = mixin.stateOut;

			Users[user._id] = user;

			mixin.user = user;

			callback(null, mixin);
		}

	};

})();
