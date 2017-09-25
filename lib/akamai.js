const crypto = require('crypto');

class Akamai {

	constructor(config) {
		this.config = config || {};
	}

	generateToken(options) {
		const delimiter = this.config.delimiter || '~';
		const algorithm = this.config.algorithm || 'sha256';
		const expWindow = options.window || 300;
		const st  = options.st || Math.round(new Date().getTime() / 1000);
		const exp = st +  expWindow;
		const secret = Buffer.from(this.config.key, 'hex');
		const hmac = crypto.createHmac(algorithm, secret);
		const payload = `st=${st}${delimiter}exp=${exp}${delimiter}acl=${options.acl}`;

		if (this.config.salt) {
			hmac.update(`${payload}${delimiter}salt=${this.config.salt}`);
		} else {
			hmac.update(payload);
		}
		const signature = hmac.digest('hex');
		const token = `${payload}${delimiter}hmac=${signature}`;
		return token;
	}

	getQueryString(options) {
		const tokenName = this.config.tokenName || 'hdtns';
		const qs = `?${tokenName}=${this.generateToken(options)}`;
		return qs;
	}

}

module.exports = Akamai;