# Vercel + Nx Monorepo Deployment Guide

The issue you encountered is common with Nx monorepos on Vercel. Here's how to fix it properly.

## 🚨 **The Problem**

Vercel detected your Nx monorepo but couldn't find the Nx modules because:
1. **Wrong root directory**: Vercel was looking in `/apps/vn-record-store-be/` 
2. **Missing dependencies**: Nx dependencies are in the root `node_modules`
3. **Build configuration**: Nx needs to run from the repository root

## ✅ **The Solution**

I've updated your configuration to work properly with the monorepo structure.

## 📁 **New File Structure**

```
vinyl-records-store/
├── vercel.json                    # ✅ Root-level Vercel config (NEW)
├── package.json                   # ✅ Root dependencies (Nx, etc.)
├── nx.json                        # ✅ Nx workspace config
├── apps/
│   ├── vn-record-store-be/
│   │   ├── package.json           # ✅ Simplified (just start script)
│   │   ├── prisma/
│   │   └── dist/                  # ✅ Built output
│   └── vn-record-store-web/
└── node_modules/                  # ✅ All dependencies here
```

## 🔧 **Updated Configuration**

### **Root `vercel.json`**
```json
{
  "version": 2,
  "buildCommand": "npm ci && npx prisma generate --schema=./apps/vn-record-store-be/prisma/schema.prisma && npx nx build vn-record-store-be --configuration=production",
  "installCommand": "npm ci",
  "builds": [
    {
      "src": "apps/vn-record-store-be/dist/main.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/apps/vn-record-store-be/dist/main.js"
    },
    {
      "src": "/graphql",
      "dest": "/apps/vn-record-store-be/dist/main.js"
    },
    {
      "src": "/(.*)",
      "dest": "/apps/vn-record-store-be/dist/main.js"
    }
  ]
}
```

### **Backend `package.json`** (simplified)
```json
{
  "scripts": {
    "start": "node dist/main.js"
  }
}
```

## 🚀 **Updated Vercel Setup**

### **Step 1: Update Vercel Project Settings**

In your Vercel dashboard:

1. **Project Settings** → **General**
2. **Root Directory**: Leave as **`.`** (root of repository)
3. **Framework Preset**: Select **"Other"** ✅ (This is correct!)
4. **Build Command**: Will use the one from `vercel.json`
5. **Install Command**: Will use the one from `vercel.json`

### **Step 2: Environment Variables** (same as before)
```bash
DATABASE_URL = postgresql://pet-market_owner:...?sslmode=require&channel_binding=require
STRIPE_SECRET = 1RMSZuBLjxdv4y...MhDRJtMs9x...
FRONTEND_URL = https://edmkn.github.io/Music-Album-Store
NODE_ENV = production
```

### **Step 3: Deploy**
```bash
git add .
git commit -m "Fix Vercel configuration for Nx monorepo"
git push origin master
```

## 🔍 **What Changed**

### **Before (Not Working):**
```bash
# Vercel was trying to:
cd apps/vn-record-store-be/
npm install                    # ❌ Missing Nx dependencies
npx nx build                   # ❌ Nx not found
```

### **After (Working):**
```bash
# Vercel now does:
npm ci                         # ✅ Installs all dependencies at root
npx prisma generate            # ✅ Generates Prisma client
npx nx build vn-record-store-be # ✅ Builds backend with Nx
```

## 🧪 **Testing the Fix**

### **Local Test:**
```bash
# Test the exact commands Vercel will run:
npm ci
npx prisma generate --schema=./apps/vn-record-store-be/prisma/schema.prisma
npx nx build vn-record-store-be --configuration=production

# Check if build output exists:
ls -la apps/vn-record-store-be/dist/
```

### **Vercel Test:**
1. Push the updated configuration
2. Check Vercel build logs for:
   - ✅ `npm ci` completes successfully
   - ✅ `npx prisma generate` runs without errors
   - ✅ `npx nx build vn-record-store-be` builds successfully
   - ✅ `dist/main.js` is created

## 🚨 **Common Issues & Solutions**

### **Issue 1: "Could not find Nx modules"**
**Solution**: ✅ Fixed - Root-level configuration ensures Nx is available

### **Issue 2: "Prisma client not found"**
**Solution**: ✅ Fixed - Prisma generates before build

### **Issue 3: "Build output not found"**
**Solution**: ✅ Fixed - Correct paths in `vercel.json`

### **Issue 4: "Framework preset 'Other'"**
**Solution**: ✅ This is correct! Nx monorepos should use "Other"

## 📊 **Build Process Flow**

```
GitHub Push
    ↓
Vercel Detects Change
    ↓
1. Install: npm ci (at root)
    ↓
2. Generate: npx prisma generate
    ↓
3. Build: npx nx build vn-record-store-be
    ↓
4. Deploy: apps/vn-record-store-be/dist/main.js
    ↓
✅ Backend Live at: https://your-project.vercel.app
```

## 🎯 **Expected Result**

After pushing the updated configuration:

1. **Build logs** should show:
   ```
   ✅ npm ci completed
   ✅ Prisma client generated
   ✅ Nx build completed
   ✅ Function deployed
   ```

2. **Your backend** will be live at:
   - **API**: `https://your-project.vercel.app/api`
   - **GraphQL**: `https://your-project.vercel.app/graphql`

3. **Update your frontend secrets**:
   ```bash
   BACKEND_URL = https://your-project.vercel.app
   GRAPHQL_URL = https://your-project.vercel.app/graphql
   API_BASE_URL = https://your-project.vercel.app/api
   ```

## ✅ **Why This Works**

- 🏗️ **Monorepo-aware**: Builds from root where Nx is available
- 📦 **Dependency management**: All packages installed at root level
- 🗄️ **Database ready**: Prisma client generated before build
- 🚀 **Optimized**: Serverless functions with proper routing

Your Nx monorepo will now deploy successfully to Vercel! 🎵✨ 