var World = {
	user: require('./fixtures/user')
};

var supertest = require('supertest');
var request = supertest('http://localhost:8000');

module.exports = function () {
	'use strict';

	it('- register', function (callback) {
		request
		.post('/auth/local/register')
		.send({
			username: World.user.username,
			password: World.user.password
		})
		.expect(200)
		.end(function (e, res) {
			if(e) {
				return callback(e);
			}

			World.registerToken = res.body.token;
			callback(null);
		});
	});

	it('- verify email', function (callback) {
		request
		.post('/auth/local/verify_email')
		.send({
			username: World.user.username,
			password: World.user.password,
			token: World.registerToken
		})
		.expect(200)
		.end(function (e, res) {
			if(e) {
				return callback(e);
			}

			World.apiToken = res.body.token;
			callback(null);
		});
	});

	it('- authorize', function (callback) {
		request
		.get('/auth/bearer/authorize')
		.set('Authorization', 'bearer ' + World.apiToken)
		.expect(200, callback);
	});

	it('- logout', function (callback) {
		request
		.get('/auth/bearer/logout')
		.set('Authorization', 'bearer ' + World.apiToken)
		.expect(200, callback);
	});

	it('- login', function (callback) {
		request
		.post('/auth/local/login')
		.send({
			username: World.user.username,
			password: World.user.password
		})
		.expect(200)
		.end(function (e, res) {
			if(e) {
				return callback(e);
			}

			World.apiToken = res.body.token;
			callback(null);
		});
	});

	it('- change password', function (callback) {
		request
		.post('/auth/local/change_password')
		.set('Authorization', 'bearer ' + World.apiToken)
		.send({
			username: World.user.username,
			password: World.user.password,
			newPassword: World.user.newPassword
		})
		.expect(200)
		.end(function (e, res) {
			if(e) {
				return callback(e);
			}

			World.apiToken = res.body.token;
			callback(null);
		});
	});

	it('- logout', function (callback) {
		request
		.get('/auth/bearer/logout')
		.set('Authorization', 'bearer ' + World.apiToken)
		.expect(200, callback);
	});

	it('- login with new password', function (callback) {
		request
		.post('/auth/local/login')
		.send({
			username: World.user.username,
			password: World.user.newPassword
		})
		.expect(200)
		.end(function (e, res) {
			if(e) {
				return callback(e);
			}

			World.apiToken = res.body.token;
			callback(null);
		});
	});

	it('- logout', function (callback) {
		request
		.get('/auth/bearer/logout')
		.set('Authorization', 'bearer ' + World.apiToken)
		.expect(200, callback);
	});

	it('- forgot password', function (callback) {
		request
		.post('/auth/local/forgot_password')
		.send({
			username: World.user.username
		})
		.expect(200)
		.end(function (e, res) {
			if(e) {
				return callback(e);
			}

			World.resetToken = res.body.token;
			callback(null);
		});
	});

	it('- reset password', function (callback) {
		request
		.post('/auth/local/reset_password')
		.send({
			username: World.user.username,
			password: World.user.password,
			token: World.resetToken
		})
		.expect(200)
		.end(function (e, res) {
			if(e) {
				return callback(e);
			}

			World.apiToken = res.body.token;
			callback(null);
		});
	});

	it('- authorize', function (callback) {
		request
		.get('/auth/bearer/authorize')
		.set('Authorization', 'bearer ' + World.apiToken)
		.expect(200, callback);
	});

};
