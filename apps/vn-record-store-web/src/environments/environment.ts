export const environment = {
  production: false,
  githubPages: false,
  
  // Local development URLs (matching your .env files)
  backendUrl: 'http://localhost:3000',
  graphqlUrl: 'http://localhost:3000/graphql',
  apiBaseUrl: 'http://localhost:3000/api',
  frontendUrl: 'http://localhost:4200',
  
  // Stripe configuration (from your .env)
  stripePublishableKey: 'pk_test_51RMSZuBLjxdv4y32AAFvP1Q33Lr9AB05r55nSMElvdVsrr856mXugG6nrg4xP7PzTqT5v9F7bsgU9TJphsxvd8YR00gIEpI9CT',
  
  // Feature flags
  enablePayments: true,
  enableGraphQL: true,
  
  // Debug settings
  enableLogging: true,
  logLevel: 'debug'
}; 