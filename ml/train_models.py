import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
from sklearn.preprocessing import LabelEncoder, StandardScaler
import joblib
import os
from datetime import datetime

class IPLMatchPredictor:
    def __init__(self):
        self.models = {
            'logistic_regression': LogisticRegression(random_state=42, max_iter=1000),
            'random_forest': RandomForestClassifier(random_state=42, n_estimators=100),
            'gradient_boosting': GradientBoostingClassifier(random_state=42, n_estimators=100)
        }
        self.scalers = {}
        self.encoders = {}
        self.feature_columns = []
        
    def load_data(self):
        """Load IPL data from CSV files"""
        print("Loading IPL data...")
        
        # Load matches data
        matches_df = pd.read_csv('../ipl_matches_data.csv')
        ball_by_ball_df = pd.read_csv('../ball_by_ball_data.csv')
        teams_df = pd.read_csv('../teams_data.csv')
        
        print(f"Loaded {len(matches_df)} matches, {len(ball_by_ball_df)} ball-by-ball records")
        return matches_df, ball_by_ball_df, teams_df
    
    def preprocess_match_data(self, matches_df, ball_by_ball_df):
        """Preprocess data for match prediction"""
        print("Preprocessing match data...")
        
        # Filter completed matches
        completed_matches = matches_df[matches_df['result'] == 'win'].copy()
        
        # Create features for each match
        processed_matches = []
        
        for _, match in completed_matches.iterrows():
            features = self.extract_match_features(match, ball_by_ball_df)
            if features:
                processed_matches.append(features)
        
        return pd.DataFrame(processed_matches)
    
    def extract_match_features(self, match, ball_by_ball_df):
        """Extract features from a single match"""
        try:
            match_id = match['match_id']
            match_balls = ball_by_ball_df[ball_by_ball_df['match_id'] == match_id]
            
            if len(match_balls) == 0:
                return None
            
            # Basic match info
            features = {
                'season': int(match['season']),
                'venue': match['venue'],
                'toss_winner': match['toss_winner'],
                'toss_decision': match['toss_decision'],
                'team1': match['team1'],
                'team2': match['team2'],
                'winner': match['match_winner']
            }
            
            # Team performance in this match
            team1_balls = match_balls[match_balls['team_batting'] == match['team1']]
            team2_balls = match_balls[match_balls['team_batting'] == match['team2']]
            
            features['team1_runs'] = team1_balls['total_runs'].sum()
            features['team2_runs'] = team2_balls['total_runs'].sum()
            features['team1_wickets'] = team1_balls['is_wicket'].sum()
            features['team2_wickets'] = team2_balls['is_wicket'].sum()
            
            # Boundary statistics
            features['team1_fours'] = (team1_balls['batter_runs'] == '4').sum()
            features['team1_sixes'] = (team1_balls['batter_runs'] == '6').sum()
            features['team2_fours'] = (team2_balls['batter_runs'] == '4').sum()
            features['team2_sixes'] = (team2_balls['batter_runs'] == '6').sum()
            
            return features
            
        except Exception as e:
            print(f"Error processing match {match['match_id']}: {e}")
            return None
    
    def prepare_training_data(self, processed_df):
        """Prepare data for training"""
        print("Preparing training data...")
        
        # Create target variable (1 if team1 wins, 0 if team2 wins)
        processed_df['target'] = (processed_df['winner'] == processed_df['team1']).astype(int)
        
        # Select features for training
        feature_cols = [
            'season', 'team1_runs', 'team2_runs', 'team1_wickets', 'team2_wickets',
            'team1_fours', 'team1_sixes', 'team2_fours', 'team2_sixes'
        ]
        
        # Add categorical features
        categorical_cols = ['venue', 'toss_winner', 'toss_decision']
        
        # Encode categorical variables
        for col in categorical_cols:
            if col in processed_df.columns:
                le = LabelEncoder()
                processed_df[f'{col}_encoded'] = le.fit_transform(processed_df[col].fillna('unknown'))
                self.encoders[col] = le
                feature_cols.append(f'{col}_encoded')
        
        # Add team encoding
        team_encoder = LabelEncoder()
        all_teams = list(set(processed_df['team1'].unique()) | set(processed_df['team2'].unique()))
        team_encoder.fit(all_teams)
        
        processed_df['team1_encoded'] = team_encoder.transform(processed_df['team1'])
        processed_df['team2_encoded'] = team_encoder.transform(processed_df['team2'])
        self.encoders['teams'] = team_encoder
        
        feature_cols.extend(['team1_encoded', 'team2_encoded'])
        
        self.feature_columns = feature_cols
        
        # Prepare X and y
        X = processed_df[feature_cols].fillna(0)
        y = processed_df['target']
        
        return X, y
    
    def train_models(self, X, y):
        """Train all models"""
        print("Training models...")
        
        # Split data
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
        
        # Scale features
        scaler = StandardScaler()
        X_train_scaled = scaler.fit_transform(X_train)
        X_test_scaled = scaler.transform(X_test)
        self.scalers['standard'] = scaler
        
        results = {}
        
        for name, model in self.models.items():
            print(f"Training {name}...")
            
            # Train model
            if name == 'logistic_regression':
                model.fit(X_train_scaled, y_train)
                y_pred = model.predict(X_test_scaled)
            else:
                model.fit(X_train, y_train)
                y_pred = model.predict(X_test)
            
            # Evaluate
            accuracy = accuracy_score(y_test, y_pred)
            results[name] = {
                'model': model,
                'accuracy': accuracy,
                'predictions': y_pred
            }
            
            print(f"{name} accuracy: {accuracy:.4f}")
            print(classification_report(y_test, y_pred))
        
        return results, X_test, y_test
    
    def save_models(self, results):
        """Save trained models"""
        print("Saving models...")
        
        model_dir = 'trained_models'
        os.makedirs(model_dir, exist_ok=True)
        
        for name, result in results.items():
            model_path = os.path.join(model_dir, f'{name}_model.pkl')
            joblib.dump(result['model'], model_path)
        
        # Save encoders and scalers
        joblib.dump(self.encoders, os.path.join(model_dir, 'encoders.pkl'))
        joblib.dump(self.scalers, os.path.join(model_dir, 'scalers.pkl'))
        joblib.dump(self.feature_columns, os.path.join(model_dir, 'feature_columns.pkl'))
        
        print(f"Models saved to {model_dir}")
    
    def train(self):
        """Complete training pipeline"""
        try:
            # Load data
            matches_df, ball_by_ball_df, teams_df = self.load_data()
            
            # Preprocess
            processed_df = self.preprocess_match_data(matches_df, ball_by_ball_df)
            
            if len(processed_df) == 0:
                print("No processed data available for training")
                return
            
            # Prepare training data
            X, y = self.prepare_training_data(processed_df)
            
            # Train models
            results, X_test, y_test = self.train_models(X, y)
            
            # Save models
            self.save_models(results)
            
            # Find best model
            best_model = max(results.items(), key=lambda x: x[1]['accuracy'])
            print(f"\nBest model: {best_model[0]} with accuracy: {best_model[1]['accuracy']:.4f}")
            
            return results
            
        except Exception as e:
            print(f"Error during training: {e}")
            return None

class IPLPlayerPerformancePredictor:
    def __init__(self):
        self.models = {
            'runs_regressor': None,  # Will be RandomForestRegressor
            'wickets_regressor': None  # Will be RandomForestRegressor
        }
        self.encoders = {}
        self.scalers = {}
        self.feature_columns = []
    
    def extract_player_features(self, player_name, ball_by_ball_df, matches_df, opposition=None, venue=None):
        """Extract features for a specific player"""
        # Filter balls for this player
        player_balls = ball_by_ball_df[ball_by_ball_df['batter'] == player_name]
        
        if len(player_balls) == 0:
            return None
        
        features = {
            'total_balls_faced': len(player_balls),
            'total_runs_scored': player_balls['batter_runs'].astype(int).sum(),
            'total_fours': (player_balls['batter_runs'] == '4').sum(),
            'total_sixes': (player_balls['batter_runs'] == '6').sum(),
            'dismissals': player_balls['is_wicket'].sum(),
            'average_strike_rate': 0
        }
        
        # Calculate strike rate
        if features['total_balls_faced'] > 0:
            features['average_strike_rate'] = (features['total_runs_scored'] / features['total_balls_faced']) * 100
        
        # Add opposition and venue if provided
        if opposition:
            opposition_balls = player_balls[player_balls['team_bowling'] == opposition]
            features['opposition_runs'] = opposition_balls['batter_runs'].astype(int).sum()
            features['opposition_balls'] = len(opposition_balls)
        else:
            features['opposition_runs'] = 0
            features['opposition_balls'] = 0
        
        if venue:
            # This would need venue mapping from matches
            features['venue_runs'] = features['total_runs_scored']  # Placeholder
        else:
            features['venue_runs'] = features['total_runs_scored']
        
        return features

def main():
    print("IPL ML Model Training Started")
    print("=" * 50)
    
    # Train match prediction models
    match_predictor = IPLMatchPredictor()
    match_results = match_predictor.train()
    
    if match_results:
        print("\nMatch prediction models trained successfully!")
    else:
        print("\nMatch prediction training failed!")
    
    print("\nTraining completed!")

if __name__ == "__main__":
    main()
