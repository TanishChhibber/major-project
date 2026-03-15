# IPL Analytics Dashboard - Setup Guide

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 18 or higher)
- **Python** (version 3.8 or higher)
- **npm** or **yarn** (for frontend dependencies)
- **pip** (for Python dependencies)
- **Git** (for version control)

## Quick Start

### 1. Clone/Download the Project

If you have the project files, navigate to the `IPL Data` directory:
```bash
cd "c:/Users/yatis/Desktop/IPL Data"
```

### 2. Install Dependencies

#### Frontend Dependencies
```bash
cd frontend
npm install
cd ..
```

#### Backend Dependencies
```bash
cd backend
npm install
cd ..
```

#### ML/Python Dependencies
```bash
cd ml
pip install -r requirements.txt
cd ..
```

### 3. Start the Applications

#### Start Backend Server
```bash
cd backend
npm start
```
The backend will start on `http://localhost:5000`

#### Start Frontend Development Server
Open a new terminal and run:
```bash
cd frontend
npm run dev
```
The frontend will start on `http://localhost:3000`

#### Train ML Models (Optional)
```bash
cd ml
python train_models.py
```

### 4. Access the Application

Open your browser and navigate to: `http://localhost:3000`

## Detailed Setup Instructions

### Frontend Setup

#### 1. Navigate to Frontend Directory
```bash
cd frontend
```

#### 2. Install Dependencies
```bash
npm install
```

This will install:
- React 18
- Vite (build tool)
- TailwindCSS
- Recharts (for charts)
- Lucide React (icons)

#### 3. Environment Configuration
Create a `.env` file in the frontend directory:
```env
VITE_API_URL=http://localhost:5000
```

#### 4. Start Development Server
```bash
npm run dev
```

#### 5. Build for Production
```bash
npm run build
```

### Backend Setup

#### 1. Navigate to Backend Directory
```bash
cd backend
```

#### 2. Install Dependencies
```bash
npm install
```

This will install:
- Express.js
- CORS
- CSV Parser
- Security middleware (helmet, compression)
- Rate limiting

#### 3. Environment Configuration
Copy the example environment file:
```bash
cp .env.example .env
```

Edit the `.env` file:
```env
PORT=5000
FRONTEND_URL=http://localhost:3000
NODE_ENV=development
```

#### 4. Start the Server
```bash
# For development with auto-reload
npm run dev

# For production
npm start
```

#### 5. Verify Backend is Running
Check health endpoint:
```bash
curl http://localhost:5000/api/health
```

### ML Models Setup

#### 1. Navigate to ML Directory
```bash
cd ml
```

#### 2. Install Python Dependencies
```bash
pip install -r requirements.txt
```

This will install:
- pandas (data processing)
- numpy (numerical operations)
- scikit-learn (machine learning)
- matplotlib/seaborn (visualization)
- joblib (model serialization)

#### 3. Train the Models
```bash
python train_models.py
```

This will:
- Load IPL data from CSV files
- Preprocess the data
- Train multiple ML models
- Save trained models to `trained_models/` directory

#### 4. Test Predictions
```bash
python predict_match.py
python player_prediction.py
```

## Data Setup

### 1. Verify Data Files
Ensure the following CSV files are in the root directory:
- `ipl_matches_data.csv`
- `teams_data.csv`
- `ball_by_ball_data.csv`
- `players-data-updated.csv`

### 2. Data Structure
The backend automatically reads these files on startup. No database setup is required for the basic version.

### 3. Data Refresh
The backend refreshes data cache every hour automatically.

## Troubleshooting

### Common Issues

#### 1. Port Already in Use
If you get a port conflict error:
```bash
# Kill process on port 3000
npx kill-port 3000

# Kill process on port 5000
npx kill-port 5000
```

#### 2. Python Module Not Found
```bash
# Ensure you're in the correct directory
cd ml

# Install dependencies again
pip install -r requirements.txt

# Use virtual environment (recommended)
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

#### 3. Frontend Build Issues
```bash
# Clear node modules and reinstall
cd frontend
rm -rf node_modules package-lock.json
npm install
```

#### 4. Backend Data Loading Issues
Check that CSV files are in the correct location and have the right permissions:
```bash
# Verify files exist
ls -la ../ipl_matches_data.csv
ls -la ../teams_data.csv
ls -la ../ball_by_ball_data.csv
```

#### 5. CORS Errors
Ensure the backend CORS configuration matches your frontend URL:
```env
# In backend/.env
FRONTEND_URL=http://localhost:3000
```

### Debug Mode

#### Frontend Debug
The frontend includes comprehensive error handling and loading states. Check the browser console for detailed error messages.

#### Backend Debug
Enable debug logging:
```bash
# In backend/.env
NODE_ENV=development
```

#### ML Models Debug
The ML scripts include detailed logging. Check the output for data loading and training progress.

## Performance Optimization

### Frontend Optimization
1. **Enable Production Mode**
   ```bash
   npm run build
   npm run preview
   ```

2. **Enable Compression**
   The backend automatically compresses responses.

3. **Browser Caching**
   Static assets are cached automatically in production.

### Backend Optimization
1. **Data Caching**
   The backend caches CSV data in memory for faster responses.

2. **Rate Limiting**
   API endpoints are rate-limited to prevent abuse.

3. **Compression**
   Response compression is enabled by default.

## Development Workflow

### Making Changes

1. **Frontend Changes**
   - Edit files in `frontend/src/`
   - Changes auto-reload in development mode
   - Test in browser at `http://localhost:3000`

2. **Backend Changes**
   - Edit files in `backend/`
   - Server auto-restarts with `npm run dev`
   - Test API endpoints directly

3. **ML Model Changes**
   - Edit files in `ml/`
   - Retrain models with `python train_models.py`
   - Test predictions with prediction scripts

### Code Quality

#### Frontend Linting
```bash
cd frontend
npm run lint
```

#### Backend Linting
```bash
cd backend
npm run lint
```

#### Python Linting
```bash
cd ml
pip install flake8 black
flake8 .
black .
```

## Deployment

### Frontend Deployment (Vercel/Netlify)

1. **Build the Application**
   ```bash
   cd frontend
   npm run build
   ```

2. **Deploy to Vercel**
   ```bash
   npm install -g vercel
   vercel --prod
   ```

3. **Deploy to Netlify**
   - Upload the `dist/` folder to Netlify
   - Configure build settings

### Backend Deployment (Heroku/Railway)

1. **Prepare for Deployment**
   ```bash
   cd backend
   # Update .env for production
   heroku create your-app-name
   git add .
   git commit -m "Deploy to Heroku"
   git push heroku main
   ```

2. **Environment Variables**
   Set production environment variables in your hosting platform.

### ML Models Deployment

For production ML predictions, consider:
- **AWS Lambda** for serverless predictions
- **Google Cloud Functions**
- **Azure Functions**

## Monitoring and Maintenance

### Health Checks
- Backend: `http://your-domain.com/api/health`
- Frontend: Check browser console for errors

### Log Monitoring
- Backend logs are output to console
- Use a logging service for production monitoring

### Data Updates
- Replace CSV files with new data
- Backend automatically refreshes cache
- Retrain ML models with new data

## Support

If you encounter issues:

1. Check the troubleshooting section above
2. Verify all dependencies are installed
3. Ensure data files are in the correct location
4. Check browser console for frontend errors
5. Check backend logs for server errors

For additional support, refer to the documentation in the `docs/` directory.
