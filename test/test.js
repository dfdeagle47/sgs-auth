var SGSAuth = require('../src/sgs-auth');

var Delegates = require('./fixtures/delegates');

describe('Testing the auth. module', function () {
	'use strict';

	before('Initialising the module', function () {
		global.sgsAuth = new SGSAuth(Delegates, {
			bearer: {},
			local: {}
		});
	});

	it('Login', function (callback) {
		var username = 'test@example.com';
		var password = 'test';

		global.sgsAuth
		.stub('local', 'login')(username, password, callback);
	});

});
