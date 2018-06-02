const { Router } = require('express');
const axios = require('axios');
const SYMBOLS = Router();

const SYMBOLS_URL = 'https://api.iextrading.com/1.0/ref-data/symbols';

SYMBOLS.get('/', ({params}, clientResponse) => {
	const apiRequestPath = SYMBOLS_URL;
	axios.get(apiRequestPath)
		.then(apiResponse => {
			const { data } = apiResponse;
			console.log({data});
			clientResponse.dbRespond({resourceType: 'symbols', ...data});
		})
});

module.exports = SYMBOLS;

