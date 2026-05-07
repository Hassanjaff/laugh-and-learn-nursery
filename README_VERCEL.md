# Laugh and Learn Nursery - Vercel Deployment Guide

This website is now fully configured for deployment to Vercel. Follow the steps below to deploy your site.

## Quick Start

### 1. Create a Git Repository

If you haven't already, initialize a Git repository and push your code:

```bash
cd /home/ubuntu/laugh-and-learn-nursery
git init
git add .
git commit -m "Initial commit: Laugh and Learn Nursery website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/laugh-and-learn-nursery.git
git push -u origin main
```

### 2. Deploy to Vercel

#### Option A: Using Vercel Dashboard (Easiest)

1. Go to [https://vercel.com/new](https://vercel.com/new)
2. Click "Continue with GitHub" (or your preferred Git provider)
3. Authorize Vercel to access your repositories
4. Select the `laugh-and-learn-nursery` repository
5. Vercel will auto-detect the settings:
   - **Framework**: Vite
   - **Build Command**: `pnpm build`
   - **Output Directory**: `dist/public`
   - **Install Command**: `pnpm install`
6. Click "Deploy"
7. Wait for deployment to complete
8. Your site will be live at `https://your-project.vercel.app`

#### Option B: Using Vercel CLI

```bash
# Install Vercel CLI globally
npm i -g vercel

# Deploy from your project directory
cd /home/ubuntu/laugh-and-learn-nursery
vercel

# Follow the prompts to link your project and deploy
```

## Configuration Files

The project includes Vercel-specific configuration:

| File | Purpose |
|------|---------|
| `vercel.json` | Vercel deployment settings, build commands, and routing rules |
| `.vercelignore` | Files to exclude from deployment |
| `package.json` | Updated with Vercel-compatible build scripts |
| `vite.config.ts` | Optimized for static site generation |

## What's Included

✅ **Static Site Build**: Vite builds the entire site as static HTML/CSS/JS  
✅ **SPA Routing**: Client-side routing works seamlessly  
✅ **Security Headers**: X-Content-Type-Options, X-Frame-Options, X-XSS-Protection  
✅ **Asset Caching**: Long-term caching for `/assets/` directory  
✅ **Automatic HTTPS**: All traffic encrypted  
✅ **CDN**: Global content delivery network  

## Build Details

### Local Testing

Test the production build locally:

```bash
cd /home/ubuntu/laugh-and-learn-nursery
pnpm build
pnpm preview
```

This will start a preview server at `http://localhost:4173`

### Build Output

- **Input**: React components in `client/src/`
- **Output**: Static files in `dist/public/`
- **Size**: ~1.1 MB HTML + ~124 MB CSS + ~713 MB JS (minified)
- **Build Time**: ~4-5 seconds

## Custom Domain

After deployment:

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Domains**
3. Add your custom domain (e.g., `laughandlearn.com`)
4. Update DNS records at your domain registrar
5. Vercel provides auto-renewal SSL certificates

## Environment Variables

This is a static site and doesn't require environment variables. If you add backend features later:

1. Go to **Settings** → **Environment Variables**
2. Add variables as needed
3. Redeploy for changes to take effect

## Continuous Deployment

Once connected to Git:

- **Main branch**: Automatically deploys to production
- **Pull requests**: Create preview deployments
- **Rollbacks**: Easy rollback to previous deployments from dashboard

## Monitoring

Vercel provides built-in analytics:

1. Go to your project dashboard
2. Click **Analytics** tab
3. View:
   - Page views and traffic
   - Response times
   - Error rates
   - Web Core Vitals

## Troubleshooting

### Build Fails

**Check locally first:**
```bash
cd /home/ubuntu/laugh-and-learn-nursery
pnpm install
pnpm build
```

**Common issues:**
- Missing dependencies in `package.json`
- TypeScript errors: Run `pnpm check`
- Node version mismatch: Vercel uses Node 18+

### Site Shows 404

- Ensure `vercel.json` has correct rewrites
- Check that `dist/public/index.html` exists
- Verify routing configuration

### Slow Performance

- Check Vercel Analytics for bottlenecks
- Optimize images (consider Vercel Image Optimization)
- Enable compression in `vercel.json`

## Support

- **Vercel Docs**: https://vercel.com/docs
- **Vite Docs**: https://vitejs.dev
- **React Docs**: https://react.dev

## Next Steps

1. ✅ Push code to GitHub
2. ✅ Deploy to Vercel
3. ✅ Set up custom domain
4. ✅ Monitor analytics
5. Consider adding:
   - Contact form with email notifications
   - Photo gallery with uploads
   - Blog section
   - Parent portal

## File Structure

```
laugh-and-learn-nursery/
├── client/
│   ├── src/
│   │   ├── pages/          # Page components
│   │   ├── components/     # Reusable UI components
│   │   ├── App.tsx         # Main app component
│   │   ├── main.tsx        # Entry point
│   │   └── index.css       # Global styles
│   ├── index.html          # HTML template
│   └── public/             # Static assets
├── dist/
│   └── public/             # Build output (generated)
├── vercel.json             # Vercel configuration
├── .vercelignore           # Deployment exclusions
├── vite.config.ts          # Vite build config
└── package.json            # Dependencies and scripts
```

## Questions?

For deployment issues, check:
1. Vercel dashboard logs
2. Build output in terminal
3. Vercel documentation
4. GitHub issues in related projects

Good luck with your deployment! 🚀
