# GitHub Pages Deployment Guide

This guide explains how to deploy the Vinyl Records Store Angular application to GitHub Pages.

## Prerequisites

1. **GitHub Repository**: Your code must be in a GitHub repository
2. **GitHub Pages**: Enabled in your repository settings
3. **Node.js**: Version 20.x or higher

## Setup Instructions

### 1. Enable GitHub Pages

1. Go to your GitHub repository
2. Navigate to **Settings** → **Pages**
3. Under **Source**, select **GitHub Actions**
4. Save the settings

### 2. Repository Configuration

The workflow is already configured to work with the repository name `vinyl-records-store`. If your repository has a different name, update the `base-href` in the workflow file:

```yaml
# In .github/workflows/deploy-github-pages.yml
- name: Build Angular app for GitHub Pages
  run: npx nx build vn-record-store-web --configuration=github-pages --base-href="/YOUR-REPO-NAME/"
```

### 3. Workflow Triggers

The deployment workflow will run:
- **Automatically** on pushes to `main` or `master` branch
- **Manually** via GitHub Actions tab (workflow_dispatch)
- **On Pull Requests** (build only, no deployment)

### 4. Build Configuration

The project includes a special `github-pages` configuration that:
- Disables SSR (Server-Side Rendering) for static hosting
- Optimizes the build for production
- Includes proper asset hashing
- Adds the 404.html file for SPA routing

## Deployment Process

### Automatic Deployment

1. Push your changes to the `main` or `master` branch:
   ```bash
   git add .
   git commit -m "Your commit message"
   git push origin main
   ```

2. GitHub Actions will automatically:
   - Install dependencies
   - Build the Angular application
   - Deploy to GitHub Pages

3. Your site will be available at: `https://USERNAME.github.io/vinyl-records-store/`

### Manual Deployment

1. Go to your GitHub repository
2. Click on **Actions** tab
3. Select **Deploy to GitHub Pages** workflow
4. Click **Run workflow** button
5. Select the branch and click **Run workflow**

## Project Structure for Deployment

```
vinyl-records-store/
├── .github/
│   └── workflows/
│       └── deploy-github-pages.yml    # GitHub Actions workflow
├── apps/
│   └── vn-record-store-web/
│       ├── src/
│       │   ├── index.html             # Updated with SPA routing script
│       │   └── 404.html               # SPA routing fallback
│       └── project.json               # Updated with github-pages config
└── package.json                       # Build scripts
```

## Key Features

### SPA Routing Support
- **404.html**: Redirects all routes to index.html
- **Index.html**: Contains script to handle GitHub Pages routing
- **Client-side routing**: Works properly with Angular Router

### Build Optimizations
- **Static output**: No SSR for GitHub Pages compatibility
- **Asset optimization**: Minification and compression
- **Cache busting**: File hashing for proper caching
- **Bundle size limits**: Configured budgets for performance

## Troubleshooting

### Common Issues

1. **404 errors on refresh**: 
   - Ensure 404.html is properly included in assets
   - Check that the SPA routing script is in index.html

2. **Assets not loading**:
   - Verify the `base-href` matches your repository name
   - Check that assets are properly configured in project.json

3. **Build failures**:
   - Check Node.js version (should be 20.x)
   - Ensure all dependencies are properly installed
   - Review build logs in GitHub Actions

### Debugging

1. **View build logs**: Go to Actions tab → Select workflow run → View logs
2. **Test locally**: Run `npx nx build vn-record-store-web --configuration=github-pages`
3. **Check output**: Verify files in `dist/apps/vn-record-store-web/browser/`

## Environment Variables

For production deployment, you may need to set environment variables in GitHub repository settings:

1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Add any required environment variables
3. Reference them in the workflow file if needed

## Custom Domain (Optional)

To use a custom domain:

1. Add a `CNAME` file to `apps/vn-record-store-web/public/` with your domain
2. Configure DNS settings with your domain provider
3. Update GitHub Pages settings to use the custom domain

## Monitoring

- **Deployment status**: Check the Actions tab for workflow status
- **Site availability**: Monitor your GitHub Pages URL
- **Performance**: Use browser dev tools to check loading times

Your Vinyl Records Store will be live at: `https://YOUR-USERNAME.github.io/vinyl-records-store/` 