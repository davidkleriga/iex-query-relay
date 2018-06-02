const { Router } = require('express');
const axios = require('axios');
const ChartRouter = Router();

const DEFAULT_TIME_PERIOD = '5y';
const CHART_URL = 'https://api.iextrading.com/1.0/stock/{{symbol}}/chart/{{timePeriod}}';

const addTimeRangeField = (data) => {
	if (!data || !data.length) return data;
	data['time-range'] = `[${data[0].date}:${data[data.length-1].date}]`;
	return data;
}

//time period one of [ 5y, 2y, 1y, ytd, 6m, 3m, 1m, 1d]
ChartRouter.get('/:symbol/:timePeriod', ({params}, clientResponse) => {
	const {symbol, timePeriod} = params;
	const apiRequestPath = CHART_URL.replace('{{symbol}}', symbol).replace('{{timePeriod}}', timePeriod || DEFAULT_TIME_PERIOD);
	console.log({apiRequestPath});
	axios.get(apiRequestPath)
		.then(apiResponse => {
			const { data } = apiResponse;
			addTimeRangeField(data);
			clientResponse.dbRespond({resourceType: `chart-${symbol}-${timePeriod}`, items: data});
		})
});

ChartRouter.get('/:symbol', ({params}, clientResponse) => {
	const {symbol} = params;
	const apiRequestPath = CHART_URL.replace('{{symbol}}', symbol).replace('{{timePeriod}}', DEFAULT_TIME_PERIOD);
	console.log({apiRequestPath});
	axios.get(apiRequestPath)
		.then(apiResponse => {
			const { data } = apiResponse;
			addTimeRangeField(data);
			clientResponse.dbRespond({resourceType: `chart-${symbol}-${DEFAULT_TIME_PERIOD}`, items: data});
		})
});

module.exports = ChartRouter;