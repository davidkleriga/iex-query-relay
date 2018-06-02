const { Router } = require('express');
const axios = require('axios');
const SummaryRouter = Router();

const FINANCIALS_URL = 'https://api.iextrading.com/1.0/stock/{{symbol}}/financials';

SummaryRouter.get('/:symbol', ({params}, clientResponse) => {
	const {symbol} = params;
	const apiRequestPath = FINANCIALS_URL.replace('{{symbol}}', symbol);
	console.log({apiRequestPath});
	axios.get(apiRequestPath)
		.then(apiResponse => {
			const { data } = apiResponse;
			console.log({data});
			clientResponse.dbRespond({resourceType: 'summary', ...data});
		})
});

module.exports = SummaryRouter;