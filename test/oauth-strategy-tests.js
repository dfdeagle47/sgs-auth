var supertest = require('supertest');
var request = supertest('http://localhost:8000');

module.exports = function () {
	'use strict';

	it('- google login', function (callback) {
		request
		.get('/auth/google/login')
		.expect(302, callback);
	});

	it('- facebook login', function (callback) {
		request
		.get('/auth/facebook/login')
		.expect(302, callback);
	});


};
