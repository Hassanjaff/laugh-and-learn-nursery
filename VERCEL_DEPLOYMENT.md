# Vercel Deployment Guide - Laugh and Learn Nursery

This guide will help you deploy the Laugh and Learn Nursery website to Vercel.

## Prerequisites

- A Vercel account (free at https://vercel.com)
- Git repository (GitHub, GitLab, or Bitbucket)
- Node.js 18+ and pnpm installed locally (optional, for testing)

## Deployment Steps

### Option 1: Deploy from Git (Recommended)

1. **Push to GitHub/GitLab/Bitbucket**
   ```bash
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to https://vercel.com/new
   - Select your Git provider (GitHub, GitLab, or Bitbucket)
   - Authorize Vercel to access your repositories
   - Select the `laugh-and-learn-nursery` repository

3. **Configure Project Settings**
   - **Framework Preset**: Vite
   - **Build Command**: `pnpm build` (already configured)
   - **Output Directory**: `dist` (already configured)
   - **Install Command**: `pnpm install` (already configured)
   - Leave environment variables empty (not needed for static site)

4. **Deploy**
   - Click "Deploy"
   - Wait for the build to complete
   - Your site will be live at `https://your-project.vercel.app`

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   cd /home/ubuntu/laugh-and-learn-nursery
   vercel
   ```

3. **Follow the prompts**
   - Link to existing project or create new
   - Confirm build settings
   - Wait for deployment

## Configuration Files

The project includes Vercel-specific configuration:

- **`vercel.json`**: Deployment configuration with build settings, headers, and routing rules
- **`.vercelignore`**: Files to exclude from deployment
- **`package.json`**: Updated with Vercel-compatible build scripts

## Build Configuration Details

### vercel.json

```json
{
  "buildCommand": "pnpm build",
  "devCommand": "pnpm dev",
  "installCommand": "pnpm install",
  "framework": "vite",
  "outputDirectory": "dist"
}
```

### Key Features

- **Static Site Generation**: Vite builds the site as static HTML/CSS/JS
- **SPA Routing**: All routes redirect to `index.html` for client-side routing
- **Caching**: Assets in `/assets/` are cached for 1 year
- **Security Headers**: Includes X-Content-Type-Options, X-Frame-Options, X-XSS-Protection

## Custom Domain

1. Go to your Vercel project dashboard
2. Navigate to "Settings" → "Domains"
3. Add your custom domain (e.g., `laughandlearn.com`)
4. Follow DNS configuration instructions from your domain registrar

## Environment Variables

This is a static site and doesn't require environment variables. If you add backend features later:

1. Go to "Settings" → "Environment Variables"
2. Add variables as needed
3. Redeploy for changes to take effect

## Monitoring & Analytics

Vercel provides built-in analytics:

1. Go to your project dashboard
2. Click "Analytics" tab
3. View page views, response times, and more

## Troubleshooting

### Build Fails

**Issue**: Build command fails
- Check `pnpm build` works locally: `cd /home/ubuntu/laugh-and-learn-nursery && pnpm build`
- Verify all dependencies are listed in `package.json`
- Check for TypeScript errors: `pnpm check`

### Site Shows 404

**Issue**: Pages return 404 errors
- Ensure `vercel.json` has the correct `rewrites` configuration
- The SPA routing should redirect all routes to `index.html`

### Slow Performance

**Issue**: Site loads slowly
- Check Vercel Analytics for bottlenecks
- Verify images are optimized
- Consider using Vercel's Image Optimization (if added to project)

## Local Testing

Test the production build locally:

```bash
cd /home/ubuntu/laugh-and-learn-nursery
pnpm build
pnpm preview
```

This runs the built site on `http://localhost:4173`

## Continuous Deployment

Once connected to Git:

- Every push to `main` branch automatically deploys
- Preview deployments created for pull requests
- Rollback to previous deployments anytime from Vercel dashboard

## Support

- Vercel Docs: https://vercel.com/docs
- Vite Docs: https://vitejs.dev
- React Docs: https://react.dev

## Next Steps

After deployment:

1. Test all pages and navigation
2. Check mobile responsiveness
3. Verify contact information is correct
4. Set up custom domain if desired
5. Monitor analytics and performance
