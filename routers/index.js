
const { Router } = require('express');
const interceptor = require('express-interceptor');
const mongoose = require('mongoose');

const ChartRouter = require('./chart');
const SummaryRouter = require('./summary');
const BookRouter = require('./book');
const KeyStatsRouter = require('./key-stats');
const EffectiveSpreadRouter = require('./effective-spread');
const SymbolsRouter = require('./symbols');
const ListRouter = require('./list');
const DeepTradesRouter = require('./deep-trades');

const APIRouter = Router();

mongoose.connect('mongodb://localhost/test');

const Schemas = {
	'book': new mongoose.Schema({ strict: false }),
	'': new mongoose.Schema({strict: false})
};

APIRouter.use((request, response, next) => {
	const indexKey = request.path;
	const [empty, resourceType, symbol] = indexKey.split('/');
	const schema = Schemas[resourceType] || Schemas[''];
	const CacheModel = mongoose.model(resourceType, schema);
	CacheModel.findOne({index: indexKey})
		.then(data => {
			console.log('find data', {data});
			if (!data) {
				console.log('nothing stored', indexKey);
				const decoratedSend = (data) => {
					const cacheObject = new CacheModel({index: indexKey, symbol, ...data}, false);
					cacheObject.save().then(() => {
						console.log('model saved');
					})
					response.send(data);
				}
				response.dbRespond = decoratedSend;
				next();
			} else {
				console.log('responding from cache');
				response.send(data);
			}
		});
});

APIRouter.use('/chart', ChartRouter);
APIRouter.use('/summary', SummaryRouter);
APIRouter.use('/book', BookRouter);
APIRouter.use('/list', ListRouter);
APIRouter.use('/key-stats', KeyStatsRouter);
APIRouter.use('/effective-spread', EffectiveSpreadRouter);
APIRouter.use('/symbols', SymbolsRouter);
APIRouter.use('/deep-trades', DeepTradesRouter);

/**

	Key Stats - (COMPLETE)
	ShortInterestList
	EffectiveSpread - (COMPLETE)
	News
	Financials - Summary (COMPLETE)
	Symbols - (COMPLETE)
	Book - (COMPLETE)
	Trades - (COMPLETE)
	
*/

module.exports = {
	APIRouter,
	SummaryRouter,
	ListRouter
}