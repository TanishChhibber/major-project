# 🚀 IPL Analytics Dashboard - Quick Start Guide

Get your IPL Analytics Dashboard running in minutes with this quick start guide.

## ⚡ Quick Start (5 Minutes)

### 1. Install Dependencies

```bash
# Frontend
cd frontend
npm install

# Backend  
cd ../backend
npm install

# ML Models (Optional)
cd ../ml
pip install -r requirements.txt
```

### 2. Start the Applications

```bash
# Terminal 1 - Backend
cd backend
npm start

# Terminal 2 - Frontend
cd frontend
npm run dev
```

### 3. Access the Dashboard

Open your browser: **http://localhost:3000**

## 📋 Prerequisites Checklist

- [ ] Node.js 18+ installed
- [ ] Python 3.8+ installed (for ML features)
- [ ] CSV data files in root directory:
  - `ipl_matches_data.csv`
  - `teams_data.csv` 
  - `ball_by_ball_data.csv`

## 🎯 What You Get

### ✅ Features Included
- **Dynamic Season Selection** - All components update when season changes
- **Interactive Charts** - Runs distribution, boundary analysis, player performance
- **ML Predictions** - Match winner and player performance forecasting
- **Responsive Design** - Works on desktop and mobile
- **Dark Mode** - Toggle between light and dark themes
- **Real-time Updates** - Smooth animations and transitions

### 📊 Dashboard Components
- **Header** - Season selector, champion & runner up display
- **Season Stats Cards** - Total 6s, 4s, matches, teams, centuries, etc.
- **Player Performance Cards** - Orange cap, Purple cap, most boundaries
- **Points Table** - Complete team standings with logos
- **Analytics Charts** - 5 different interactive visualizations
- **ML Predictions** - Match winner and player performance predictions

## 🛠 Tech Stack

### Frontend
- **React 18** with Vite
- **TailwindCSS** for styling
- **Recharts** for data visualization
- **Lucide React** for icons

### Backend
- **Node.js + Express** API server
- **CSV data processing** with built-in caching
- **Rate limiting** and security middleware

### Machine Learning
- **Python** with scikit-learn
- **Random Forest, Gradient Boosting, Logistic Regression**
- **REST API** for predictions

## 🔧 Configuration

### Frontend Environment
```env
# frontend/.env
VITE_API_URL=http://localhost:5000
```

### Backend Environment
```env
# backend/.env
PORT=5000
FRONTEND_URL=http://localhost:3000
NODE_ENV=development
```

## 📱 Access Points

| Service | URL | Description |
|---------|-----|-------------|
| **Frontend** | http://localhost:3000 | Main dashboard |
| **Backend API** | http://localhost:5000 | REST API endpoints |
| **Health Check** | http://localhost:5000/api/health | Server status |

## 🎮 First Steps

1. **Open the Dashboard** - Navigate to http://localhost:3000
2. **Select a Season** - Use the dropdown in the header
3. **Explore Stats** - View season statistics and player performance
4. **Check Charts** - Interact with different visualizations
5. **Try Predictions** - Test ML prediction features

## 🔍 API Endpoints

### Core Data
- `GET /api/seasons` - List all available seasons
- `GET /api/season/:id` - Get complete season data
- `GET /api/teams/:season` - Get teams for a season
- `GET /api/players/:season` - Get players for a season

### ML Predictions
- `POST /api/predict/match` - Predict match winner
- `POST /api/predict/player` - Predict player performance

### Example API Call
```bash
# Get 2023 season data
curl http://localhost:5000/api/season/2023

# Predict match winner
curl -X POST http://localhost:5000/api/predict/match \
  -H "Content-Type: application/json" \
  -d '{
    "team1": "Royal Challengers Bangalore",
    "team2": "Mumbai Indians", 
    "venue": "M Chinnaswamy Stadium",
    "tossWinner": "Royal Challengers Bangalore",
    "tossDecision": "bat"
  }'
```

## 🎨 Customization

### Add New Seasons
Simply add new data to your CSV files - the backend automatically detects new seasons.

### Modify Colors
Edit `frontend/tailwind.config.js` to customize the theme.

### Add New Charts
Create new chart components in `frontend/src/components/` and add to `ChartsSection.jsx`.

## 🚀 Production Deployment

### Quick Deploy Options

**Frontend (Vercel)**
```bash
cd frontend
npm run build
npx vercel --prod
```

**Backend (Heroku)**
```bash
cd backend
git add .
git commit -m "Deploy"
heroku create your-app-name
git push heroku main
```

**ML Models (AWS Lambda)**
```bash
cd ml
python train_models.py
# Deploy trained models to Lambda/Cloud Functions
```

## 🐛 Troubleshooting

### Common Issues

**Port Already in Use**
```bash
# Kill processes on ports 3000 and 5000
npx kill-port 3000
npx kill-port 5000
```

**Data Not Loading**
- Check CSV files are in the correct location
- Verify backend console for error messages
- Check API health: http://localhost:5000/api/health

**Frontend Build Errors**
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

**ML Models Not Working**
```bash
cd ml
pip install -r requirements.txt
python train_models.py
```

## 📞 Support

### Getting Help
1. Check this guide first
2. Review detailed documentation in `docs/` folder
3. Check browser console for frontend errors
4. Check backend terminal for server errors

### Documentation Links
- **Setup Guide**: `docs/SETUP_GUIDE.md`
- **Data Schema**: `docs/DATA_SCHEMA.md` 
- **Deployment**: `docs/DEPLOYMENT.md`
- **Full README**: `README.md`

## 🎯 Next Steps

### Advanced Features
- **Season Comparison** - Compare multiple seasons side-by-side
- **Team Radar Charts** - Advanced team performance visualization
- **Player Trends** - Cross-season player performance analysis
- **Real-time Updates** - Live match data integration

### Data Enhancement
- **Historical Data** - Add more seasons of data
- **Player Statistics** - Enhanced player metrics
- **Venue Analysis** - Detailed venue statistics
- **Weather Integration** - Add weather data to predictions

### Performance Optimization
- **Database Integration** - PostgreSQL/MongoDB for better performance
- **Caching Layer** - Redis for faster data access
- **CDN Integration** - Static asset optimization
- **API Optimization** - Response time improvements

## 🏆 Success Metrics

Your dashboard is working when you can:
- ✅ Select different seasons and see all components update
- ✅ View interactive charts with smooth animations
- ✅ Get ML predictions with confidence scores
- ✅ Toggle between light and dark modes
- ✅ View responsive design on mobile devices
- ✅ Access all API endpoints successfully

---

**🎉 Congratulations! You now have a fully functional IPL Analytics Dashboard!**

For detailed information, check the comprehensive documentation in the `docs/` folder.
