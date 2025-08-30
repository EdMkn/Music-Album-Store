# .env Files + GitHub Secrets Integration Guide

This guide shows how to use your existing `.env` files for local development while using GitHub secrets for secure deployment.

## 🏗️ **Current Setup Analysis**

Your project has these `.env` files:
- **Root `.env`** - Main configuration
- **`apps/vn-record-store-be/.env`** - Backend-specific config
- **`env.example`** - Template file

## 🔄 **Integration Strategy**

### **Local Development** → Use `.env` files
### **GitHub Pages Deployment** → Use GitHub secrets
### **Backend Deployment** → Use platform-specific env vars

## 📋 **GitHub Secrets to Configure**

Based on your `.env` files, set up these GitHub repository secrets:

### **Step 1: Go to GitHub Settings**
```
https://github.com/YOUR-USERNAME/Music-Album-Store
→ Settings → Secrets and variables → Actions → New repository secret
```

### **Step 2: Add These Secrets**

#### **Frontend/Deployment Secrets:**
```bash
# Repository configuration
REPO_NAME = "Music-Album-Store"

# Frontend URL (your GitHub Pages URL)
FRONTEND_URL = "https://edmkn.github.io/Music-Album-Store"

# Backend URLs (when you deploy your backend)
BACKEND_URL = "https://your-backend.herokuapp.com"
GRAPHQL_URL = "https://your-backend.herokuapp.com/graphql"
API_BASE_URL = "https://your-backend.herokuapp.com/api"

# Stripe (frontend-safe publishable key only)
STRIPE_PUBLISHABLE_KEY = "pk_test_51RMSZuBLjxdv4y32AAFvP1Q33Lr9AB05r55nSMElvdVsrr856mXugG6nrg4xP7PzTqT5v9F7bsgU9TJphsxvd8YR00gIEpI9CT"
```

#### **⚠️ DO NOT add these to GitHub secrets:**
- `STRIPE_SECRET` - Keep this ONLY in backend deployment platform
- `DATABASE_URL` - Keep this ONLY in backend deployment platform
- `POSTGRES_*` - Keep these for local Docker only

## 🔧 **Updated Environment Configuration**

### **Local Development (.env files)**
Keep using your `.env` files as they are:

```bash
# .env (root) - for local development
DATABASE_URL="postgresql://postgres:postgres@postgres:5432/vinyl_records_store"
STRIPE_SECRET="sk_test_..." # Backend only
STRIPE_PUBLISHABLE_KEY="pk_test_..." # Frontend safe
NODE_ENV=development
PORT=3000
API_URL=http://localhost:3000/api
GRAPHQL_URL=http://localhost:3000/graphql
```

### **GitHub Pages Deployment**
Uses GitHub secrets automatically via the workflow.

### **Backend Deployment** (Heroku/Railway/etc.)
Set these environment variables in your backend hosting platform:

```bash
# Backend hosting platform environment variables
DATABASE_URL="your-production-database-url"
STRIPE_SECRET="sk_test_..." # or sk_live_ for production
FRONTEND_URL="https://edmkn.github.io/Music-Album-Store"
```

## 🔄 **How It All Works Together**

### **1. Local Development**
```bash
# Uses .env files
npm run dev
# → Reads from .env files
# → Backend: localhost:3000
# → Frontend: localhost:4200
```

### **2. GitHub Pages Build**
```bash
# Uses GitHub secrets
GitHub Actions workflow
# → Reads from repository secrets
# → Frontend: GitHub Pages URL
# → Backend: Production backend URL
```

### **3. Backend Deployment**
```bash
# Uses hosting platform env vars
Heroku/Railway deployment
# → Reads from platform environment variables
# → Database: Production database
# → Stripe: Production keys
```

## 📁 **File Structure**

```
vinyl-records-store/
├── .env                           # Local development (all services)
├── apps/
│   ├── vn-record-store-be/
│   │   └── .env                   # Backend-specific local config
│   └── vn-record-store-web/
│       └── src/
│           └── environments/
│               ├── environment.ts      # Dev config (uses .env)
│               └── environment.prod.ts # Prod config (uses GitHub secrets)
├── .github/
│   └── workflows/
│       └── deploy-github-pages.yml    # Uses GitHub secrets
└── env.example                        # Template
```

## 🛠️ **Next Steps**

### **1. Keep Your .env Files** ✅
- Continue using them for local development
- Add `.env` to `.gitignore` (if not already)
- Keep `env.example` as a template

### **2. Set Up GitHub Secrets** 🔐
- Add the secrets listed above to your GitHub repository
- Use only **frontend-safe** values (no backend secrets)

### **3. Update Your Services** 🔧
Update your services to use the environment configuration:

```typescript
// In your services (example)
import { environment } from '../environments/environment';

@Injectable()
export class ApiService {
  private apiUrl = environment.apiBaseUrl;
  private graphqlUrl = environment.graphqlUrl;
  // ...
}
```

### **4. Test the Setup** 🧪
```bash
# Test local build with .env
npm run dev

# Test production build (simulates GitHub Pages)
npx nx build vn-record-store-web --configuration=github-pages
```

## 🎯 **Summary**

- ✅ **Keep `.env` files** for local development
- ✅ **Use GitHub secrets** for deployment  
- ✅ **Environment files** handle the switching automatically
- ✅ **Security maintained** - sensitive data stays local or in proper hosting platforms

This way you get the best of both worlds: easy local development with `.env` files and secure deployment with GitHub secrets! 🎵🔐

Would you like me to help you update any specific services to use the environment configuration? 