const bodyParser = require('body-parser');
const express = require('express');
const errorHandler = require('./api/helpers/errorHandler');
const requestLogger = require('./api/helpers/requestLogger');
const cors = require('./api/helpers/cors');
const routes = require('./api/routes');

const app = express();

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.text({ type: 'application/x-www-form-urlencoded' }));
app.use(requestLogger);

app.use(express.static('public'));

app.use(cors)

app.disable('x-powered-by');
app.enable('trust proxy');

app.use(routes);

app.use(errorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`API started at: localhost:${port}`));
