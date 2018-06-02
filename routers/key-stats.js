const { Router } = require('express');
const axios = require('axios');
const KeyStatsRouter = Router();

const KEY_STATS_URL = 'https://api.iextrading.com/1.0/stock/{{symbol}}/stats';

KeyStatsRouter.get('/:symbol', ({params}, clientResponse) => {
	const {symbol} = params;
	const apiRequestPath = KEY_STATS_URL.replace('{{symbol}}', symbol);
	console.log({apiRequestPath});
	axios.get(apiRequestPath)
		.then(apiResponse => {
			const { data } = apiResponse;
			console.log({data});
			clientResponse.dbRespond({resourceType: 'key-stats', ...data});
		})
});

module.exports = KeyStatsRouter;

