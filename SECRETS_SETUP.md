# GitHub Repository Secrets Setup Guide

This guide explains how to configure repository secrets for secure deployment and configuration management.

## 🔐 Required Repository Secrets

### 1. Access GitHub Repository Settings

1. Go to your GitHub repository: `https://github.com/YOUR-USERNAME/Music-Album-Store`
2. Click on **Settings** tab
3. In the left sidebar, click **Secrets and variables** → **Actions**
4. Click **New repository secret**

### 2. Core Deployment Secrets

#### **REPO_NAME** (Optional - has default)
- **Name**: `REPO_NAME`
- **Value**: `Music-Album-Store`
- **Description**: Repository name for GitHub Pages URL generation
- **Default**: Uses `Music-Album-Store` if not set

### 3. Backend Configuration Secrets

#### **BACKEND_URL**
- **Name**: `BACKEND_URL`
- **Value**: `https://your-backend-api.herokuapp.com` or your backend URL
- **Description**: Base URL for your backend API
- **Example**: `https://vinyl-records-api.railway.app`

#### **FRONTEND_URL**
- **Name**: `FRONTEND_URL`
- **Value**: `https://YOUR-USERNAME.github.io/Music-Album-Store`
- **Description**: Your GitHub Pages URL
- **Example**: `https://edmkn.github.io/Music-Album-Store`

#### **GRAPHQL_URL**
- **Name**: `GRAPHQL_URL`
- **Value**: `https://your-backend-api.herokuapp.com/graphql`
- **Description**: GraphQL endpoint URL
- **Example**: `https://vinyl-records-api.railway.app/graphql`

#### **API_BASE_URL**
- **Name**: `API_BASE_URL`
- **Value**: `https://your-backend-api.herokuapp.com/api`
- **Description**: REST API base URL
- **Example**: `https://vinyl-records-api.railway.app/api`

### 4. Stripe Configuration Secrets

#### **STRIPE_PUBLISHABLE_KEY**
- **Name**: `STRIPE_PUBLISHABLE_KEY`
- **Value**: `pk_test_...` or `pk_live_...`
- **Description**: Stripe publishable key for frontend payments
- **Note**: This is safe to use in frontend builds

### 5. Optional Environment Secrets

#### **NODE_VERSION** (Optional - has default)
- **Name**: `NODE_VERSION`
- **Value**: `20.x`
- **Description**: Node.js version for builds
- **Default**: Uses `20.x` if not set

#### **BUILD_CONFIGURATION** (Optional - has default)
- **Name**: `BUILD_CONFIGURATION`
- **Value**: `github-pages`
- **Description**: Angular build configuration to use
- **Default**: Uses `github-pages` if not set

## 📋 Step-by-Step Secret Setup

### Step 1: Basic Deployment Secrets

```bash
# Repository name (optional - has default)
REPO_NAME = "Music-Album-Store"

# Frontend URL
FRONTEND_URL = "https://YOUR-USERNAME.github.io/Music-Album-Store"
```

### Step 2: Backend Integration Secrets

```bash
# If you have a deployed backend
BACKEND_URL = "https://your-backend.herokuapp.com"
GRAPHQL_URL = "https://your-backend.herokuapp.com/graphql"
API_BASE_URL = "https://your-backend.herokuapp.com/api"
```

### Step 3: Payment Integration Secrets

```bash
# For Stripe payments (frontend-safe publishable key)
STRIPE_PUBLISHABLE_KEY = "pk_test_51ABC...XYZ"
```

## 🔧 How Secrets Are Used in Workflow

The workflow file uses these secrets as follows:

```yaml
# Build command with dynamic repository name
run: npx nx build vn-record-store-web --base-href="/${{ secrets.REPO_NAME || env.REPO_NAME }}/"

# Environment variables passed to build
env:
  BACKEND_URL: ${{ secrets.BACKEND_URL }}
  FRONTEND_URL: ${{ secrets.FRONTEND_URL }}
  GRAPHQL_URL: ${{ secrets.GRAPHQL_URL }}
  STRIPE_PUBLISHABLE_KEY: ${{ secrets.STRIPE_PUBLISHABLE_KEY }}
  API_BASE_URL: ${{ secrets.API_BASE_URL }}
```

## 🌐 Environment-Specific Configuration

### Development vs Production

The workflow automatically sets these environment flags:

```yaml
PRODUCTION: true
GITHUB_PAGES: true
NODE_ENV: production
```

### Using Secrets in Angular

To use these secrets in your Angular application, update your environment files:

#### `apps/vn-record-store-web/src/environments/environment.ts`

```typescript
export const environment = {
  production: false,
  backendUrl: 'http://localhost:3000',
  graphqlUrl: 'http://localhost:3000/graphql',
  apiBaseUrl: 'http://localhost:3000/api',
  stripePublishableKey: 'pk_test_...',
  githubPages: false
};
```

#### `apps/vn-record-store-web/src/environments/environment.prod.ts`

```typescript
export const environment = {
  production: true,
  backendUrl: process.env['BACKEND_URL'] || 'https://default-backend.com',
  graphqlUrl: process.env['GRAPHQL_URL'] || 'https://default-backend.com/graphql',
  apiBaseUrl: process.env['API_BASE_URL'] || 'https://default-backend.com/api',
  stripePublishableKey: process.env['STRIPE_PUBLISHABLE_KEY'] || '',
  githubPages: process.env['GITHUB_PAGES'] === 'true'
};
```

## 🛡️ Security Best Practices

### ✅ Safe for Repository Secrets:
- Frontend URLs
- Stripe **publishable** keys (pk_...)
- API endpoints
- GraphQL endpoints
- Repository configuration

### ❌ Never Store in Repository Secrets:
- Stripe **secret** keys (sk_...)
- Database passwords
- Private API keys
- JWT secrets

### 🔐 For Sensitive Backend Secrets:
Store these in your backend hosting platform (Heroku, Railway, etc.):
- `STRIPE_SECRET`
- `DATABASE_URL`
- `JWT_SECRET`

## 🧪 Testing Your Configuration

### 1. Test Build Locally

```bash
# Test with environment variables
BACKEND_URL=https://test-backend.com \
STRIPE_PUBLISHABLE_KEY=pk_test_123 \
npx nx build vn-record-store-web --configuration=github-pages
```

### 2. Verify in GitHub Actions

1. Push changes to master branch
2. Go to **Actions** tab in GitHub
3. Click on the latest workflow run
4. Check the "Build Angular app for GitHub Pages" step
5. Verify environment variables are set correctly

### 3. Check Deployment Logs

Look for these messages in the workflow logs:

```
Repository: Music-Album-Store
Base URL will be: https://YOUR-USERNAME.github.io/Music-Album-Store/
🚀 Deployment completed successfully!
```

## 🔄 Updating Secrets

To update a secret:

1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Find the secret you want to update
3. Click **Update**
4. Enter the new value
5. Click **Update secret**

The next deployment will automatically use the new values.

## 🚨 Troubleshooting

### Common Issues:

1. **Secret not found**: Make sure the secret name exactly matches (case-sensitive)
2. **Build fails**: Check that all required secrets are set
3. **Wrong URL**: Verify REPO_NAME matches your actual repository name
4. **Stripe errors**: Ensure you're using the publishable key (pk_...), not secret key

### Debug Steps:

1. Check workflow logs in GitHub Actions
2. Verify secret names match exactly
3. Test build locally with same environment variables
4. Check that secrets are not empty or contain extra spaces

## 📚 Additional Resources

- [GitHub Secrets Documentation](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
- [Angular Environment Variables](https://angular.io/guide/build#configuring-application-environments)
- [Stripe Keys Documentation](https://stripe.com/docs/keys)

Your secrets are now configured for secure and flexible deployment! 🎵🔐 