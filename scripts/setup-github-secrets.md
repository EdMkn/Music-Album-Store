# Complete GitHub Secrets Setup (Frontend + Backend)

Since both your frontend and backend are in the same repository, here are **all the secrets** you need:

## 🎯 **Copy These to GitHub Repository Secrets**

Go to: `https://github.com/YOUR-USERNAME/Music-Album-Store/settings/secrets/actions`

### **1. STRIPE_PUBLISHABLE_KEY**
```
Name: STRIPE_PUBLISHABLE_KEY
Value: pk_test_51...y
```

### **2. FRONTEND_URL**
```
Name: FRONTEND_URL
Value: https://edmkn.github.io/Music-Album-Store
```

### **3. BACKEND_URL** (when you deploy your backend)
```
Name: BACKEND_URL
Value: https://your-deployed-backend.herokuapp.com
```

### **4. GRAPHQL_URL** (when you deploy your backend)
```
Name: GRAPHQL_URL
Value: https://your-deployed-backend.herokuapp.com/graphql
```

### **5. API_BASE_URL** (when you deploy your backend)
```
Name: API_BASE_URL
Value: https://your-deployed-backend.railway.app/api
```

## 🔧 **Backend Deployment Secrets (for Railway)**

### **6. RAILWAY_TOKEN**
```
Name: RAILWAY_TOKEN
Value: [Get from Railway.app dashboard → Account → Tokens]
```

### **7. DATABASE_URL** 
```
Name: DATABASE_URL
Value: postgresql://pet-market_owner:npg_U...?sslmode=require&channel_binding=require
```

### **8. STRIPE_SECRET**
```
Name: STRIPE_SECRET
Value: sk_test_...
```

## 🚫 **DO NOT Add These to GitHub Secrets**

These should stay in your local `.env` files and backend hosting platform:

- ❌ `STRIPE_SECRET` - Backend only, never in GitHub
- ❌ `DATABASE_URL` - Backend only, never in GitHub  
- ❌ `POSTGRES_*` - Local Docker only

## ✅ **What This Achieves**

- 🏠 **Local development**: Uses your `.env` files (no changes needed)
- 🌐 **GitHub Pages**: Uses secrets for secure deployment
- 🔒 **Security**: Sensitive backend data stays protected
- 🔄 **Flexibility**: Easy to update without code changes

## 🚀 **Ready to Deploy**

After adding the secrets to GitHub:

```bash
git add .
git commit -m "Configure environment integration with GitHub secrets"
git push origin master
```

Your GitHub Actions workflow will automatically use the secrets for deployment! 🎵 