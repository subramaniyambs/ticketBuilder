import express from 'express';
import mongoose from 'mongoose';
import { restRouter } from './api';
import { devConfig } from './config/env/development';
import { setGlobalMiddleware } from './api/middlewares/global-middleware';

mongoose.Promise = global.Promise;
mongoose.connect(`mongodb+srv://kaio:2QxMBCF2rr4yNwKO@${devConfig.data}.mongodb.net/${devConfig.database}`);
//mongodb+srv://kaio:2QxMBCF2rr4yNwKO@${devConfig.database}.mongodb.net/test?retryWrites=true
const app = express();
const PORT = devConfig.port;

// register global middleware
setGlobalMiddleware(app);
app.use('/api/tickets/assets', express.static('assets'));
// app.use('/', function(req, res, next) {
// 	next();
// });
app.use(express.json());
app.use('/api', restRouter);
app.use((req, res, next) => {
	const error = new Error('Not found');
	error.message = 'Invalid route';
	error.status = 404;
	next(error);
});
app.use((error, req, res, next) => {
	res.status(error.status || 500);
	return res.json({
		error: {
			message: error.message
		}
	});
});

app.listen(PORT, () => {
	console.log(`Omega services Server is running at PORT ${PORT}`);
});
