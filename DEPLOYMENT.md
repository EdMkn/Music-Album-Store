# GitHub Pages + Vercel Deployment Guide

This guide explains how to deploy your Vinyl Records Store with GitHub Pages (frontend) and Vercel (backend).

## 🏗️ **Architecture**

```
GitHub Repository (Music-Album-Store)
├── 🌐 Frontend (Angular) → GitHub Pages
├── ⚙️ Backend (NestJS) → Vercel
└── 🗄️ Database (PostgreSQL) → Neon
```

## 📋 **Prerequisites**

1. **GitHub Repository**: Your code in a GitHub repository
2. **Vercel Account**: Sign up at [vercel.com](https://vercel.com) with GitHub
3. **Neon Database**: You already have this set up!

## 🚀 **Step 1: Frontend Deployment (GitHub Pages)**

### **1.1 Enable GitHub Pages**
1. Go to your GitHub repository: `https://github.com/YOUR-USERNAME/Music-Album-Store`
2. Navigate to **Settings** → **Pages**
3. Under **Source**, select **GitHub Actions**
4. Save the settings

### **1.2 Automatic Deployment**
The frontend automatically deploys when you push to master branch via the GitHub Actions workflow.

## ⚙️ **Step 2: Backend Deployment (Vercel)**

### **2.1 Connect to Vercel**
1. Go to [vercel.com](https://vercel.com)
2. **Sign up with GitHub** (single click!)
3. **Import your repository**
4. **Framework Preset**: Select **"Other"** (correct for Nx monorepos)
5. **Root Directory**: Leave as **"."** (repository root)

### **2.2 Environment Variables in Vercel**
In Vercel dashboard → Settings → Environment Variables:
```bash
DATABASE_URL = your-neon-database-url
STRIPE_SECRET = your-stripe-secret-key
FRONTEND_URL = https://YOUR-USERNAME.github.io/Music-Album-Store
NODE_ENV = production
```

### **2.3 Deploy Backend**
Vercel automatically deploys when you push to master branch.

## 🔐 **Step 3: Configure GitHub Secrets**

Add these secrets to your GitHub repository (Settings → Secrets and variables → Actions):

### **Frontend Secrets:**
```bash
# Repository configuration
REPO_NAME = Music-Album-Store

# Frontend URL
FRONTEND_URL = https://YOUR-USERNAME.github.io/Music-Album-Store

# Backend URLs (after Vercel deployment)
BACKEND_URL = https://your-project.vercel.app
GRAPHQL_URL = https://your-project.vercel.app/graphql
API_BASE_URL = https://your-project.vercel.app/api

# Stripe (frontend-safe publishable key)
STRIPE_PUBLISHABLE_KEY = pk_test_51...
```

## 🔄 **Deployment Process**

### **Automatic Deployment**
```bash
git add .
git commit -m "Your changes"
git push origin master

# This triggers:
# 1. Vercel deploys backend automatically
# 2. GitHub Actions deploys frontend to GitHub Pages
# 3. Both services are updated with latest code
```

### **Manual Deployment**
1. **Vercel**: Go to Vercel dashboard → Deployments → Redeploy
2. **GitHub Pages**: Go to Actions tab → Run workflow manually

## 🧪 **Testing Your Deployment**

### **1. Test Backend (Vercel)**
```bash
# Health check
curl https://your-project.vercel.app/api

# GraphQL playground
https://your-project.vercel.app/graphql

# Albums API
curl https://your-project.vercel.app/api/albums
```

### **2. Test Frontend (GitHub Pages)**
```bash
# Visit your site
https://YOUR-USERNAME.github.io/Music-Album-Store/

# Check browser console for API calls
# Should see requests to your Vercel backend
```

## 📊 **Key Features**

### **SPA Routing Support**
- **404.html**: Redirects all routes to index.html
- **Hash routing**: Works properly with GitHub Pages
- **Client-side routing**: Angular Router handles navigation

### **Build Optimizations**
- **Static output**: No SSR for GitHub Pages compatibility
- **Asset optimization**: Minification and compression
- **Cache busting**: File hashing for proper caching
- **Bundle size limits**: Configured budgets for performance

### **Nx Monorepo Support**
- **Root-level configuration**: Vercel builds from repository root
- **Dependency management**: All packages installed at root level
- **Database ready**: Prisma client generated before build

## 🚨 **Troubleshooting**

### **Common Issues:**

1. **Frontend 404 errors on refresh**: 
   - Ensure 404.html is properly included in assets
   - Check that hash routing is enabled

2. **Backend build fails on Vercel**:
   - Verify environment variables are set
   - Check that `vercel.json` is in repository root
   - Ensure Nx dependencies are available

3. **Frontend can't connect to backend**:
   - Verify BACKEND_URL secret matches your Vercel URL
   - Check CORS configuration in backend
   - Test backend endpoints directly

### **Debug Steps:**
1. **Check Vercel logs**: Vercel dashboard → Functions → View logs
2. **Check GitHub Actions**: Actions tab → View workflow runs
3. **Test locally**: Run build commands locally first

## 💰 **Cost Breakdown**

- 🆓 **GitHub Pages**: Free forever
- 🆓 **Vercel**: 100GB bandwidth free tier
- 🆓 **Neon**: 512MB storage free tier
- 🆓 **GitHub Actions**: 2000 minutes free

**Total: $0/month** for small to medium projects!

## ✅ **Benefits**

- 🏠 **GitHub-integrated**: Everything managed through GitHub
- 🔄 **Auto-deploy**: Push code → automatic deployment
- 📊 **Monitoring**: Integrated logs and metrics
- 🔒 **Secure**: Secrets properly managed
- 🌍 **Global**: CDN and edge network
- 🚀 **Scalable**: Handles traffic spikes automatically

## 📚 **Additional Resources**

- **Detailed Setup**: Check `VERCEL_NX_DEPLOYMENT.md` for Nx-specific issues
- **GitHub Secrets**: See `scripts/setup-github-secrets.md` for exact values
- **Environment Integration**: See `ENV_INTEGRATION.md` for local development

## 🎯 **Final Checklist**

- [ ] GitHub Pages enabled and configured
- [ ] Vercel account created and repository connected
- [ ] Environment variables set in Vercel
- [ ] GitHub secrets configured
- [ ] Both services deploy successfully
- [ ] Frontend connects to backend correctly
- [ ] Database migrations applied
- [ ] Stripe payments working

Your complete vinyl records store is now live! 🎵✨

**Final URLs:**
- **Frontend**: https://YOUR-USERNAME.github.io/Music-Album-Store/
- **Backend**: https://your-project.vercel.app/
- **GraphQL**: https://your-project.vercel.app/graphql 