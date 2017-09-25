Akamai Token Auth
=================

## Installation
	$ npm install akamai-token-auth --save

## Usage

```js
const Akamai = require('akamai-token-auth');
const akamai = new Akamai({ key: [key], [salt: [salt], algorithm: [sha256, sha1, md5], tokenName: [tokenName]]});

const token = akamai.generateToken({ acl: [acl], st: [st], window: [window] });
const qs = akamai.generateQueryString({ acl: [acl], st: [st], window: [window] });

```