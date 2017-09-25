global.assert  = require("chai").assert;
global.expect  = require("chai").expect;
const Akamai = require('../lib/akamai');

describe('Akamai', () => {

	it('generates auth token', () => {
		const akamai = new Akamai({
			key: '35654df',
			salt: 'kbbvmcla96rg29vlg01',
			algorithm: 'md5',
			tokenName: 'token',
		});
		const token = akamai.generateToken({
			st: 1506351323,
			window: 600,
			acl: '/wngg_VOK3DIVL0001D/media/wngg_VOK3DIVL0001D_nl_1280x720_28_1*',
		});
		expect(token).to.eql('st=1506351323~exp=1506351923~acl=/wngg_VOK3DIVL0001D/media/wngg_VOK3DIVL0001D_nl_1280x720_28_1*~hmac=328466b8743199db56f95cb059107e58');
	});

	it('gets query string', () => {
		const akamai = new Akamai({
			key: '35654df',
			salt: 'kbbvmcla96rg29vlg01',
			algorithm: 'md5',
			tokenName: 'token',
		});
		const qs = akamai.getQueryString({
			st: 1506351323,
			window: 600,
			acl: '/wngg_VOK3DIVL0001D/media/wngg_VOK3DIVL0001D_nl_1280x720_28_1*',
		});
		expect(qs).to.eql('?token=st=1506351323~exp=1506351923~acl=/wngg_VOK3DIVL0001D/media/wngg_VOK3DIVL0001D_nl_1280x720_28_1*~hmac=328466b8743199db56f95cb059107e58');
	});

});