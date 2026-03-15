# IPL Analytics Dashboard - Deployment Guide

## Overview

This guide covers deployment options for the IPL Analytics Dashboard across different platforms and environments.

## Architecture Overview

```
Frontend (React/Vite)    Backend (Node.js/Express)    ML Models (Python)
       │                          │                          │
    Port 3000                 Port 5000                Port 8000 (Optional)
       │                          │                          │
    ──────────────────────────────────────────────────────────────
                          Internet/Cloud
    ──────────────────────────────────────────────────────────────
       │                          │                          │
   Vercel/Netlify           Heroku/Railway           AWS Lambda/GCF
```

## Frontend Deployment

### Option 1: Vercel (Recommended)

#### Prerequisites
- Vercel account (free)
- GitHub repository (optional but recommended)

#### Steps

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Build the Application**
   ```bash
   cd frontend
   npm run build
   ```

3. **Deploy to Vercel**
   ```bash
   vercel --prod
   ```

4. **Configure Environment Variables**
   ```bash
   vercel env add VITE_API_URL production
   # Enter: https://your-backend-url.com
   ```

#### Vercel Configuration (`vercel.json`)
```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

### Option 2: Netlify

#### Steps

1. **Build the Application**
   ```bash
   cd frontend
   npm run build
   ```

2. **Deploy to Netlify**
   - Drag and drop the `dist/` folder to Netlify
   - Or connect your GitHub repository

3. **Configure Environment Variables**
   - In Netlify dashboard: Site settings → Build & deploy → Environment
   - Add `VITE_API_URL` with your backend URL

#### Netlify Configuration (`netlify.toml`)
```toml
[build]
  publish = "dist"
  command = "npm run build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Option 3: GitHub Pages

#### Steps

1. **Update `vite.config.js`**
   ```javascript
   export default defineConfig({
     plugins: [react()],
     base: '/your-repo-name/',
     build: {
       outDir: 'dist'
     }
   })
   ```

2. **Build and Deploy**
   ```bash
   npm run build
   # Push dist folder to gh-pages branch
   ```

## Backend Deployment

### Option 1: Heroku

#### Prerequisites
- Heroku account
- Heroku CLI

#### Steps

1. **Login to Heroku**
   ```bash
   heroku login
   ```

2. **Create App**
   ```bash
   cd backend
   heroku create your-app-name
   ```

3. **Set Environment Variables**
   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set PORT=5000
   heroku config:set FRONTEND_URL=https://your-frontend-url.com
   ```

4. **Deploy**
   ```bash
   git add .
   git commit -m "Deploy to Heroku"
   git push heroku main
   ```

#### Heroku Configuration (`Procfile`)
```
web: npm start
```

### Option 2: Railway

#### Steps

1. **Install Railway CLI**
   ```bash
   npm install -g @railway/cli
   ```

2. **Login and Deploy**
   ```bash
   cd backend
   railway login
   railway init
   railway up
   ```

3. **Configure Environment Variables**
   ```bash
   railway variables set NODE_ENV=production
   railway variables set PORT=5000
   ```

### Option 3: AWS EC2

#### Steps

1. **Launch EC2 Instance**
   - Choose Ubuntu 20.04 LTS
   - Configure security groups (ports 22, 80, 443)

2. **Setup Server**
   ```bash
   # SSH into instance
   ssh -i your-key.pem ubuntu@your-ip

   # Update system
   sudo apt update && sudo apt upgrade -y

   # Install Node.js
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs

   # Install PM2
   sudo npm install -g pm2
   ```

3. **Deploy Application**
   ```bash
   # Clone repository
   git clone your-repo-url
   cd your-repo/backend

   # Install dependencies
   npm install --production

   # Start with PM2
   pm2 start server.js --name ipl-api
   pm2 startup
   pm2 save
   ```

## ML Models Deployment

### Option 1: AWS Lambda

#### Steps

1. **Create Lambda Function**
   ```python
   # lambda_function.py
   import json
   from predict_match import MatchPredictionAPI

   def lambda_handler(event, context):
       predictor = MatchPredictionAPI()
       
       # Parse input from event
       body = json.loads(event['body'])
       
       # Make prediction
       result = predictor.predict_winner(
           team1=body['team1'],
           team2=body['team2'],
           venue=body['venue'],
           toss_winner=body['toss_winner'],
           toss_decision=body['toss_decision']
       )
       
       return {
           'statusCode': 200,
           'headers': {
               'Content-Type': 'application/json',
               'Access-Control-Allow-Origin': '*'
           },
           'body': json.dumps(result)
       }
   ```

2. **Package and Deploy**
   ```bash
   # Create deployment package
   zip -r lambda_package.zip lambda_function.py trained_models/

   # Deploy using AWS CLI
   aws lambda create-function \
     --function-name ipl-predictions \
     --runtime python3.8 \
     --handler lambda_function.lambda_handler \
     --zip-file fileb://lambda_package.zip \
     --role arn:aws:iam::account-id:role/lambda-execution-role
   ```

### Option 2: Google Cloud Functions

#### Steps

1. **Create Function**
   ```python
   # main.py
   import functions_framework
   from predict_match import MatchPredictionAPI

   @functions_framework.http
   def predict_match(request):
       predictor = MatchPredictionAPI()
       
       data = request.get_json()
       result = predictor.predict_winner(**data)
       
       return result, 200, {'Content-Type': 'application/json'}
   ```

2. **Deploy**
   ```bash
   gcloud functions deploy ipl-predictions \
     --runtime python38 \
     --trigger-http \
     --entry-point predict_match \
     --allow-unauthenticated
   ```

## Database Options (Optional)

### Option 1: PostgreSQL (Recommended for Production)

#### Setup with Supabase

1. **Create Supabase Project**
   - Go to supabase.com
   - Create new project
   - Get connection string

2. **Migrate Data**
   ```sql
   -- Create tables
   CREATE TABLE matches (
     match_id INTEGER PRIMARY KEY,
     season VARCHAR(10),
     team1 VARCHAR(100),
     team2 VARCHAR(100),
     venue VARCHAR(200),
     winner VARCHAR(100),
     -- ... other columns
   );
   ```

3. **Update Backend**
   ```javascript
   // Add to backend/package.json
   "pg": "^8.8.0"

   // Update server.js to use PostgreSQL
   const { Pool } = require('pg')
   const pool = new Pool({
     connectionString: process.env.DATABASE_URL
   })
   ```

### Option 2: MongoDB

#### Setup with MongoDB Atlas

1. **Create Cluster**
   - Go to MongoDB Atlas
   - Create free cluster
   - Get connection string

2. **Update Backend**
   ```javascript
   // Add to backend/package.json
   "mongoose": "^7.0.0"

   // Update server.js
   const mongoose = require('mongoose')
   mongoose.connect(process.env.MONGODB_URL)
   ```

## Environment Configuration

### Production Environment Variables

#### Frontend (`.env.production`)
```env
VITE_API_URL=https://your-backend-api.com
VITE_ML_API_URL=https://your-ml-api.com
```

#### Backend (`.env.production`)
```env
NODE_ENV=production
PORT=5000
FRONTEND_URL=https://your-frontend-url.com
DATABASE_URL=your-database-connection-string
REDIS_URL=your-redis-connection-string
```

## SSL/HTTPS Setup

### Option 1: Let's Encrypt (Free)

```bash
# On Ubuntu/Debian
sudo apt install certbot python3-certbot-nginx

# Get certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Auto-renewal
sudo crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
```

### Option 2: Cloudflare (Free)

1. **Sign up for Cloudflare**
2. **Add your domain**
3. **Update nameservers**
4. **Enable SSL/TLS**

## Performance Optimization

### Frontend Optimization

1. **Enable Gzip Compression**
   ```javascript
   // vite.config.js
   export default defineConfig({
     build: {
       rollupOptions: {
         output: {
           manualChunks: {
             vendor: ['react', 'react-dom'],
             charts: ['recharts']
           }
         }
       }
     }
   })
   ```

2. **Enable CDN**
   ```javascript
   // Configure CDN in your hosting platform
   ```

### Backend Optimization

1. **Enable Caching**
   ```javascript
   // Add to backend/package.json
   "redis": "^4.6.0"
   "node-cache": "^5.1.2"

   // In server.js
   const NodeCache = require('node-cache')
   const cache = new NodeCache({ stdTTL: 3600 })
   ```

2. **Enable Compression**
   ```javascript
   // Already included in server.js
   app.use(compression())
   ```

## Monitoring and Logging

### Option 1: Sentry (Error Tracking)

#### Frontend
```bash
npm install @sentry/react @sentry/tracing
```

```javascript
// In src/main.jsx
import * as Sentry from "@sentry/react"

Sentry.init({
  dsn: "your-sentry-dsn",
  integrations: [new Sentry.BrowserTracing()],
})
```

#### Backend
```bash
npm install @sentry/node
```

```javascript
// In server.js
const Sentry = require("@sentry/node")

Sentry.init({
  dsn: "your-sentry-dsn",
})
```

### Option 2: LogRocket (User Session Recording)

```bash
npm install logrocket
```

```javascript
// In src/main.jsx
import LogRocket from 'logrocket'

LogRocket.init('your-app-id')
```

## Scaling Considerations

### Horizontal Scaling

1. **Load Balancer Setup**
   ```nginx
   upstream backend {
     server server1:5000;
     server server2:5000;
     server server3:5000;
   }
   ```

2. **Database Scaling**
   - Read replicas
   - Connection pooling
   - Indexing optimization

### Vertical Scaling

1. **Increase Server Resources**
   - More RAM
   - More CPU cores
   - Faster storage

## CI/CD Pipeline

### GitHub Actions

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      - name: Install dependencies
        run: cd frontend && npm ci
      - name: Build
        run: cd frontend && npm run build
      - name: Deploy to Vercel
        run: cd frontend && npx vercel --prod --token ${{ secrets.VERCEL_TOKEN }}

  backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      - name: Install dependencies
        run: cd backend && npm ci --production
      - name: Deploy to Heroku
        run: |
          cd backend
          git remote add heroku https://git.heroku.com/your-app.git
          git push heroku main
```

## Security Best Practices

### Frontend Security

1. **Content Security Policy**
   ```html
   <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';">
   ```

2. **Environment Variable Protection**
   - Never expose sensitive data in frontend
   - Use backend for sensitive operations

### Backend Security

1. **Input Validation**
   ```javascript
   const { body, validationResult } = require('express-validator')

   app.post('/api/predict', [
     body('team1').isString().trim().escape(),
     body('team2').isString().trim().escape(),
   ], (req, res) => {
     const errors = validationResult(req)
     if (!errors.isEmpty()) {
       return res.status(400).json({ errors: errors.array() })
     }
     // Process request
   })
   ```

2. **Rate Limiting**
   ```javascript
   // Already configured in server.js
   const limiter = rateLimit({
     windowMs: 15 * 60 * 1000,
     max: 100
   })
   ```

## Troubleshooting

### Common Deployment Issues

1. **CORS Errors**
   - Ensure backend CORS allows frontend URL
   - Check environment variables

2. **API Timeouts**
   - Increase timeout limits
   - Optimize database queries

3. **Memory Issues**
   - Monitor memory usage
   - Implement caching strategies

### Health Checks

```javascript
// Add to backend
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage()
  })
})
```

## Cost Optimization

### Free Tier Usage

- **Vercel**: 100GB bandwidth/month
- **Heroku**: Free tier (with limitations)
- **Supabase**: 500MB database
- **AWS Lambda**: 1M requests/month

### Monitoring Costs

- Set up billing alerts
- Monitor usage regularly
- Optimize resource allocation

## Support and Maintenance

### Regular Maintenance Tasks

1. **Update Dependencies**
   ```bash
   npm audit fix
   pip install --upgrade -r requirements.txt
   ```

2. **Backup Data**
   - Regular database backups
   - Model versioning

3. **Performance Monitoring**
   - Response times
   - Error rates
   - User analytics

### Emergency Procedures

1. **Rollback Plan**
   - Keep previous versions
   - Database backups
   - Quick rollback scripts

2. **Incident Response**
   - Alert setup
   - Communication plan
   - Documentation updates
