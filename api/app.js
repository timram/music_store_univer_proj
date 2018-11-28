const SwaggerExpress = require('swagger-express-mw');
const bodyParser = require('body-parser');
const app = require('express')();
const requestLogger = require('./api/helpers/request-logger');
const errorHandler = require('./api/helpers/error-handler');
const authorization = require('./api/helpers/authorization');

const config = {
  configDir: 'config',
  appRoot: __dirname,
  swaggerSecurityHandlers: {
    token: authorization.tokenAuth
  }
};

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.text({ type: 'application/x-www-form-urlencoded' }));
app.use(requestLogger);

SwaggerExpress.create(config, (err, swaggerExpress) => {
  if (err) { throw err; }

  // install middleware
  swaggerExpress.register(app);

  app.disable('x-powered-by');
  app.enable('trust proxy');

  app.use(errorHandler.middleware);

  const port = process.env.PORT || 10010;
  app.listen(port, () => console.log(`API started at: localhost:${port}`));
});
