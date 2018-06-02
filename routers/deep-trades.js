const { Router } = require('express');
const axios = require('axios');
const DeepTradesRouter = Router();

const DEEP_TRADES_URL = 'https://api.iextrading.com/1.0/deep/trades?symbols={{symbol}}';

DeepTradesRouter.get('/:symbol', ({params}, clientResponse) => {
	const {symbol} = params;
	const apiRequestPath = DEEP_TRADES_URL.replace('{{symbol}}', symbol);
	console.log({apiRequestPath});
	axios.get(apiRequestPath)
		.then(apiResponse => {
			const { data } = apiResponse;
			console.log({data});
			clientResponse.dbRespond({resourceType: 'deep-trades', ...data});
		})
});

module.exports = DeepTradesRouter;