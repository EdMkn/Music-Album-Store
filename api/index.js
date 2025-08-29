const { NestFactory } = require('@nestjs/core');

// Import the AppModule - we need to get this from the built dist
let app = null;

async function createNestApp() {
  if (!app) {
    // Import AppModule from the built application
    // In Vercel's serverless environment, the built files are in the function directory
    const { AppModule } = require('./main.js');
    
    app = await NestFactory.create(AppModule);
    
    // Configure CORS
    app.enableCors({
      origin: true,
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'x-apollo-operation-name', 'apollo-require-preflight'],
    });
    
    // Set global prefix
    app.setGlobalPrefix('api', {
      exclude: ['/graphql']
    });
    
    await app.init();
  }
  
  return app;
}

module.exports = async (req, res) => {
  try {
    const nestApp = await createNestApp();
    const expressInstance = nestApp.getHttpAdapter().getInstance();
    
    // Handle the request
    return expressInstance(req, res);
  } catch (error) {
    console.error('Error in serverless function:', error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
}; 