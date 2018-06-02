const { Router } = require('express');
const axios = require('axios');
const EffectiveSpread = Router();

const EFFECTIVE_SPREAD_URL = 'https://api.iextrading.com/1.0/stock/{{symbol}}/effective-spread';

EffectiveSpread.get('/:symbol', ({params}, clientResponse) => {
	const {symbol} = params;
	const apiRequestPath = EFFECTIVE_SPREAD_URL.replace('{{symbol}}', symbol);
	console.log({apiRequestPath});
	axios.get(apiRequestPath)
		.then(apiResponse => {
			const { data } = apiResponse;
			console.log({data});
			clientResponse.dbRespond({resourceType: 'effective-spread', ...data});
		})
});

module.exports = EffectiveSpread;

