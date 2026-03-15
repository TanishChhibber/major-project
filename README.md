# IPL Analytics Dashboard

A comprehensive interactive IPL analytics website with real-time season-based updates, machine learning predictions, and beautiful visualizations.

## 🚀 Features

- **Dynamic Season Selection**: All components update when season changes
- **Interactive Charts**: Runs distribution, boundary analysis, player performance
- **ML Predictions**: Match winner prediction, player performance forecasting
- **Responsive Design**: Works seamlessly on desktop and mobile
- **Dark Mode Support**: Toggle between light and dark themes

## 📁 Project Structure

```
IPL Data/
├── frontend/          # React Vite + TailwindCSS + ShadCN UI
├── backend/           # Node.js/Express API
├── ml/               # Python ML models and scripts
├── data/             # Processed datasets
├── docs/             # Documentation
└── *.csv            # Raw IPL datasets
```

## 🛠 Tech Stack

### Frontend
- React (Vite)
- TailwindCSS
- ShadCN UI components
- Recharts for visualizations

### Backend
- Node.js + Express
- REST API endpoints

### Machine Learning
- Python (scikit-learn, pandas, numpy)
- Logistic Regression, Random Forest, Gradient Boosting

## 🏃‍♂️ Quick Start

### Prerequisites
- Node.js 18+
- Python 3.8+
- npm/yarn

### Installation

1. **Frontend Setup**
```bash
cd frontend
npm install
npm run dev
```

2. **Backend Setup**
```bash
cd backend
npm install
npm start
```

3. **ML Models Setup**
```bash
cd ml
pip install -r requirements.txt
python train_models.py
```

## 📊 Data Schema

### Match Data
- match_id, season, team1, team2, venue, toss_winner, match_winner
- win_by_runs, win_by_wickets, player_of_match

### Ball-by-Ball Data
- batter, bowler, runs, extras, wickets, over_number, ball_number

### Team Data
- team_id, team_name, team_short, logo_url

## 🎯 API Endpoints

- `GET /api/seasons` - List all seasons
- `GET /api/season/:id` - Season-specific data
- `GET /api/teams/:season` - Team stats for season
- `GET /api/players/:season` - Player stats for season
- `POST /api/predict/match` - Match winner prediction
- `POST /api/predict/player` - Player performance prediction

## 🤖 ML Models

### Match Winner Prediction
**Features**: Team form, head-to-head, venue, toss decision
**Algorithms**: Random Forest, Gradient Boosting
**Accuracy**: ~75%

### Player Performance Prediction
**Features**: Historical performance, opposition, venue
**Output**: Predicted runs/wickets

## 🎨 UI Components

### Header
- IPL Analysis title
- Champion & Runner Up
- Season dropdown

### Stats Cards
- Total 6s, 4s, Matches, Teams
- Centuries, Half Centuries, Venues

### Player Cards
- Orange Cap (Most runs)
- Purple Cap (Most wickets)
- Most boundaries

### Points Table
- Team logos, matches played, wins, losses, points

### Charts
- Runs distribution (bar chart)
- Boundary analysis (stacked bar)
- Player performance (top 10)
- Wickets analysis
- Match outcomes (pie chart)

## 🌟 Advanced Features

- Season comparison mode
- Team performance radar charts
- Win probability simulation
- Player trend analysis
- Real-time match predictions

## 🚀 Deployment

### Frontend (Vercel/Netlify)
```bash
cd frontend
npm run build
# Deploy dist/ folder
```

### Backend (Heroku/Railway)
```bash
cd backend
# Deploy with Node.js buildpack
```

### ML Models (AWS Lambda/Google Cloud)
```bash
cd ml
# Deploy as serverless functions
```

## 📈 Performance Features

- Data caching for faster loading
- Lazy loading for charts
- Optimized bundle size
- Smooth animations and transitions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

MIT License - see LICENSE file for details

## 🙏 Acknowledgments

- IPL for providing the data
- Cricket analytics community
- Open source contributors
