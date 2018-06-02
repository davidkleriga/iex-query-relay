const { Router } = require('express');
const axios = require('axios');
const BookRouter = Router();

const BOOK_URL = 'https://api.iextrading.com/1.0/stock/{{symbol}}/book';

BookRouter.get('/:symbol', ({params}, clientResponse) => {
	const {symbol} = params;
	const apiRequestPath = BOOK_URL.replace('{{symbol}}', symbol);
	console.log({apiRequestPath});
	axios.get(apiRequestPath)
		.then(apiResponse => {
			const { data } = apiResponse;
			console.log({data});
			clientResponse.dbRespond({resourceType: 'book', ...data});
		})
});

module.exports = BookRouter;