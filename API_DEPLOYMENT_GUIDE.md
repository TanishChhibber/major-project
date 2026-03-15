# API Deployment Guide - Frontend Configuration

## Problem Fixed
The frontend was calling `localhost:5000` for API requests, causing "Failed to fetch season data: 500" errors in production.

## Solution Implemented
Replaced all hardcoded localhost API calls with configurable environment variables.

## Files Modified

### 1. Created API Configuration (`frontend/src/config/api.js`)
- Centralized API configuration
- Uses `import.meta.env.VITE_API_BASE_URL` for the backend URL
- Falls back to `http://localhost:5000` for development
- Provides `apiFetch()` helper function for consistent API calls

### 2. Updated API Calls
- `frontend/src/hooks/useSeasonData.js` - Season data fetching
- `frontend/src/components/PlayerDropdown.jsx` - Players list
- `frontend/src/components/MLPredictions.jsx` - Teams/venues and predictions

### 3. Environment Configuration
- Created `frontend/.env` with `VITE_API_BASE_URL`
- Created `frontend/.env.example` as template
- Updated `.gitignore` to allow `.env` in frontend directory

### 4. Vite Configuration
- Updated `frontend/vite.config.js` proxy to use environment variable

## Deployment Instructions

### On Render Dashboard

1. **Frontend Service Settings:**
   - Root Directory: `frontend`
   - Build Command: `npm install && npm run build`
   - Publish Directory: `dist`
   - Node Version: 18

2. **Add Environment Variable:**
   - Go to your frontend service on Render
   - Click "Environment" tab
   - Add Environment Variable:
     - Key: `VITE_API_BASE_URL`
     - Value: `https://your-backend-service.onrender.com`
   - Replace `your-backend-service.onrender.com` with your actual backend URL

3. **Redeploy:**
   - Click "Manual Deploy" → "Deploy Latest Commit"

### Local Development

1. **Copy the example file:**
   ```bash
   cp frontend/.env.example frontend/.env
   ```

2. **Update the .env file:**
   ```
   VITE_API_BASE_URL=http://localhost:5000
   ```

3. **Start development:**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## Environment Variables

| Variable | Description | Development | Production |
|----------|-------------|-------------|------------|
| `VITE_API_BASE_URL` | Backend API URL | `http://localhost:5000` | `https://your-backend.onrender.com` |

## API Endpoints Used

- `GET /api/seasons` - Get available seasons
- `GET /api/season/{year}` - Get season data
- `GET /api/players` - Get players list
- `GET /api/teams` - Get teams and venues
- `POST /api/predict/match` - Match prediction
- `POST /api/predict/player` - Player prediction

## Verification

After deployment, check the browser console:
- Should show successful API calls to your backend URL
- No more "Failed to fetch season data: 500" errors
- Data should load correctly from the deployed backend

## Troubleshooting

### Still getting 500 errors?
1. Verify the backend URL is correct in Render environment variables
2. Check if backend is deployed and running
3. Ensure CORS is properly configured on the backend

### Environment variable not working?
1. Ensure variable name starts with `VITE_` (Vite requirement)
2. Check that the variable is set in Render dashboard, not just in .env file
3. Redeploy the frontend after adding the variable

### Build fails?
1. Check that all API imports are correct
2. Verify the API config file exists
3. Run `npm run build` locally to test
