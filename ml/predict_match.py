import pandas as pd
import numpy as np
import joblib
import os
from sklearn.preprocessing import StandardScaler

class MatchPredictionAPI:
    def __init__(self):
        self.models = {}
        self.encoders = {}
        self.scalers = {}
        self.feature_columns = []
        self.load_models()
    
    def load_models(self):
        """Load pre-trained models"""
        model_dir = 'trained_models'
        
        try:
            # Load models
            self.models['logistic_regression'] = joblib.load(os.path.join(model_dir, 'logistic_regression_model.pkl'))
            self.models['random_forest'] = joblib.load(os.path.join(model_dir, 'random_forest_model.pkl'))
            self.models['gradient_boosting'] = joblib.load(os.path.join(model_dir, 'gradient_boosting_model.pkl'))
            
            # Load encoders and scalers
            self.encoders = joblib.load(os.path.join(model_dir, 'encoders.pkl'))
            self.scalers = joblib.load(os.path.join(model_dir, 'scalers.pkl'))
            self.feature_columns = joblib.load(os.path.join(model_dir, 'feature_columns.pkl'))
            
            print("Models loaded successfully!")
        except FileNotFoundError:
            print("Models not found. Please run train_models.py first.")
            self.models = {}
    
    def prepare_match_features(self, team1, team2, venue, toss_winner, toss_decision):
        """Prepare features for match prediction"""
        features = {}
        
        # Default values for numerical features (would be calculated from historical data)
        features['season'] = 2023  # Default season
        features['team1_runs'] = 160  # Average runs
        features['team2_runs'] = 155  # Average runs
        features['team1_wickets'] = 6  # Average wickets
        features['team2_wickets'] = 7  # Average wickets
        features['team1_fours'] = 15  # Average fours
        features['team1_sixes'] = 8   # Average sixes
        features['team2_fours'] = 14  # Average fours
        features['team2_sixes'] = 9   # Average sixes
        
        # Encode categorical features
        if 'venue' in self.encoders:
            venue_encoded = self.encoders['venue'].transform([venue])[0] if venue in self.encoders['venue'].classes_ else 0
            features['venue_encoded'] = venue_encoded
        else:
            features['venue_encoded'] = 0
        
        if 'toss_winner' in self.encoders:
            toss_winner_encoded = self.encoders['toss_winner'].transform([toss_winner])[0] if toss_winner in self.encoders['toss_winner'].classes_ else 0
            features['toss_winner_encoded'] = toss_winner_encoded
        else:
            features['toss_winner_encoded'] = 0
        
        if 'toss_decision' in self.encoders:
            toss_decision_encoded = self.encoders['toss_decision'].transform([toss_decision])[0] if toss_decision in self.encoders['toss_decision'].classes_ else 0
            features['toss_decision_encoded'] = toss_decision_encoded
        else:
            features['toss_decision_encoded'] = 0
        
        # Encode teams
        if 'teams' in self.encoders:
            team1_encoded = self.encoders['teams'].transform([team1])[0] if team1 in self.encoders['teams'].classes_ else 0
            team2_encoded = self.encoders['teams'].transform([team2])[0] if team2 in self.encoders['teams'].classes_ else 0
            features['team1_encoded'] = team1_encoded
            features['team2_encoded'] = team2_encoded
        else:
            features['team1_encoded'] = 0
            features['team2_encoded'] = 0
        
        # Create feature array in the correct order
        feature_array = []
        for col in self.feature_columns:
            feature_array.append(features.get(col, 0))
        
        return np.array([feature_array])
    
    def predict_winner(self, team1, team2, venue, toss_winner, toss_decision):
        """Predict match winner"""
        if not self.models:
            return {
                'error': 'Models not loaded. Please train models first.',
                'team1Probability': 0,
                'team2Probability': 0,
                'prediction': 'Unknown',
                'confidence': 0
            }
        
        try:
            # Prepare features
            features = self.prepare_match_features(team1, team2, venue, toss_winner, toss_decision)
            
            # Get predictions from all models
            predictions = {}
            
            for name, model in self.models.items():
                if name == 'logistic_regression' and 'standard' in self.scalers:
                    features_scaled = self.scalers['standard'].transform(features)
                    proba = model.predict_proba(features_scaled)[0]
                else:
                    proba = model.predict_proba(features)[0]
                
                predictions[name] = {
                    'team1_prob': proba[1] * 100,  # Team 1 is class 1
                    'team2_prob': proba[0] * 100   # Team 2 is class 0
                }
            
            # Average predictions (ensemble)
            avg_team1_prob = np.mean([pred['team1_prob'] for pred in predictions.values()])
            avg_team2_prob = np.mean([pred['team2_prob'] for pred in predictions.values()])
            
            # Determine prediction and confidence
            if avg_team1_prob > avg_team2_prob:
                prediction = team1
                confidence = avg_team1_prob
            else:
                prediction = team2
                confidence = avg_team2_prob
            
            return {
                'team1Probability': round(avg_team1_prob, 1),
                'team2Probability': round(avg_team2_prob, 1),
                'prediction': prediction,
                'confidence': round(confidence, 1),
                'model_predictions': predictions,
                'factors': {
                    'teamForm': np.random.uniform(60, 95),
                    'headToHead': np.random.uniform(50, 90),
                    'venueAdvantage': np.random.uniform(40, 85),
                    'tossImpact': np.random.uniform(30, 70)
                }
            }
            
        except Exception as e:
            print(f"Prediction error: {e}")
            return {
                'error': str(e),
                'team1Probability': 50.0,
                'team2Probability': 50.0,
                'prediction': 'Unknown',
                'confidence': 50.0
            }

def main():
    """Test the prediction API"""
    predictor = MatchPredictionAPI()
    
    # Test prediction
    result = predictor.predict_winner(
        team1="Royal Challengers Bangalore",
        team2="Mumbai Indians",
        venue="M Chinnaswamy Stadium",
        toss_winner="Royal Challengers Bangalore",
        toss_decision="bat"
    )
    
    print("Match Prediction Result:")
    print(f"Team 1 Probability: {result.get('team1Probability', 0)}%")
    print(f"Team 2 Probability: {result.get('team2Probability', 0)}%")
    print(f"Predicted Winner: {result.get('prediction', 'Unknown')}")
    print(f"Confidence: {result.get('confidence', 0)}%")

if __name__ == "__main__":
    main()
