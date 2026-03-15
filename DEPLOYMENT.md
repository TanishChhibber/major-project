# Deployment Guide - Render

## Frontend (React + Vite)

### Fixed Issues:
1. ✅ Scripts now use `npx` to avoid permission issues
2. ✅ Added Node.js 18+ engine requirement
3. ✅ Explicit build output directory (`dist`)
4. ✅ Proper .gitignore files created
5. ✅ node_modules removed from repository
6. ✅ Vite config optimized for production

### Render Configuration:
- **Root Directory**: `frontend`
- **Build Command**: `npm install && npm run build`
- **Publish Directory**: `dist`
- **Node Version**: 18

### Local Commands Before Push:

```bash
# Clean up any existing node_modules
rm -rf frontend/node_modules backend/node_modules

# Install dependencies and test build
cd frontend
npm install
npm run build

# Verify dist directory exists
ls -la dist/

# Commit and push
git add .
git commit -m "Fix deployment issues - update package.json and build config"
git push origin main
```

### Render Settings:
1. Go to your Render dashboard
2. Static Site service
3. Connect your GitHub repository
4. Set Root Directory to: `frontend`
5. Build Command: `npm install && npm run build`
6. Publish Directory: `dist`
7. Node Version: 18

### Environment Variables (Optional):
- `NODE_ENV=production`
- `VITE_API_URL=https://your-backend-url.onrender.com`

## Backend (Node.js + Express)

### Render Configuration:
- **Root Directory**: `backend`
- **Build Command**: `npm install`
- **Start Command**: `node server.js`
- **Node Version**: 18

### Environment Variables:
- `NODE_ENV=production`
- `PORT=5000`
- `FRONTEND_URL=https://your-frontend-url.onrender.com`

## Troubleshooting:

### "vite: Permission denied" - FIXED
- Used `npx vite` instead of direct `vite` commands
- Added proper Node.js engine version

### Build fails - FIXED
- Explicit build output directory in vite.config.js
- Proper .gitignore to exclude node_modules
- Optimized build configuration

### Large chunk sizes warning - OPTIMIZED
- Added manual chunk splitting for vendor and charts
- This improves loading performance

### API Proxy Issues
- Update frontend API calls to use full backend URL in production
- Or configure Render rewrite rules in render.yaml
