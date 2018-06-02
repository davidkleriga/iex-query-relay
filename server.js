
const express = require('express');
const port = process.env.PORT || 8080;
const {APIRouter} = require('./routers/');

const application = express();

application.use(APIRouter);

application.listen(port);

/**
	Attribution to IEX:
	“Data provided for free by IEX. View IEX’s Terms of Use.”
	https://iextrading.com/api-exhibit-a/
*/