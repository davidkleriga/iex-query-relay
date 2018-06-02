const { Router } = require('express');
const axios = require('axios');
const ListRouter = Router();

const LIST_MOST_ACTIVE_URL = 'https://api.iextrading.com/1.0/stock/market/list/mostactive';

ListRouter.get('/most-active', ({params}, clientResponse) => {
	const {symbol} = params;
	axios.get(LIST_MOST_ACTIVE_URL)
		.then(apiResponse => {
			const { data } = apiResponse;
			console.log({data});
			clientResponse.dbRespond({resourceType: 'list', ...data});
		})
});

module.exports = ListRouter;