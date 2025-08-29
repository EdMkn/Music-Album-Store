export const environment = {
  production: true,
  githubPages: false,
  
  // Production URLs (will be overridden by GitHub Actions)
  backendUrl: 'https://music-album-store-7br7nlxca-edmkns-projects.vercel.app',
  graphqlUrl: 'https://music-album-store-7br7nlxca-edmkns-projects.vercel.app/graphql',
  apiBaseUrl: 'https://music-album-store-7br7nlxca-edmkns-projects.vercel.app/api',
  frontendUrl: 'https://edmkn.github.io/Music-Album-Store',
  
  // Stripe configuration
  stripePublishableKey: '',
  
  // Feature flags
  enablePayments: true,
  enableGraphQL: true,
  
  // Debug settings (disabled in production)
  enableLogging: false,
  logLevel: 'error'
}; 