const { NestFactory } = require('@nestjs/core');

let cachedExpressApp = null;

async function createNestExpressApp() {
  if (!cachedExpressApp) {
    const { AppModule } = require('./dist/main.js');

    const nestApp = await NestFactory.create(AppModule);
    nestApp.enableCors({
      origin: true,
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'x-apollo-operation-name', 'apollo-require-preflight'],
    });
    nestApp.setGlobalPrefix('api', {
      exclude: ['/graphql']
    });

    await nestApp.init();
    cachedExpressApp = nestApp.getHttpAdapter().getInstance();
  }
  return cachedExpressApp;
}

module.exports = async (req, res) => {
  try {
    const expressInstance = await createNestExpressApp();

    // Only rewrite /api/graphql -> /graphql; leave other /api routes intact
    if (typeof req.url === 'string' && req.url.startsWith('/api/graphql')) {
      req.url = req.url.replace(/^\/api\/graphql/, '/graphql');
    }

    return expressInstance(req, res);
  } catch (error) {
    console.error('Error in serverless function:', error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
}; 