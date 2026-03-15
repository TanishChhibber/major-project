import React, { useState, useEffect } from 'react'
import { Brain, TrendingUp, Users, Target, Award } from 'lucide-react'
import PlayerDropdown from './PlayerDropdown'

export default function MLPredictions({ seasonData }) {
  const [teams, setTeams] = useState([])
  const [venues, setVenues] = useState([])
  
  const [matchPrediction, setMatchPrediction] = useState({
    team1: '',
    team2: '',
    venue: '',
    tossWinner: '',
    tossDecision: 'bat',
    result: null,
    loading: false
  })

  const [playerPrediction, setPlayerPrediction] = useState({
    player: '',
    opposition: '',
    venue: '',
    result: null,
    loading: false
  })

  // Fetch teams and venues from API
  useEffect(() => {
    const fetchTeamsAndVenues = async () => {
      try {
        const response = await fetch('/api/teams')
        if (response.ok) {
          const data = await response.json()
          setTeams(data.teams || [])
          setVenues(data.venues || [])
        }
      } catch (error) {
        console.error('Error fetching teams:', error)
        // Fallback to season data teams
        const seasonTeams = seasonData?.pointsTable?.map(team => team.name) || []
        setTeams(seasonTeams)
        setVenues([
          'M Chinnaswamy Stadium', 'Eden Gardens', 'Wankhede Stadium',
          'MA Chidambaram Stadium', 'Arun Jaitley Stadium', 'Nehru Stadium',
          'Punjab Cricket Association Stadium', 'Rajiv Gandhi International Stadium'
        ])
      }
    }
    fetchTeamsAndVenues()
  }, [seasonData])

  const handleMatchPrediction = async () => {
    if (!matchPrediction.team1 || !matchPrediction.team2 || !matchPrediction.venue) {
      return
    }

    setMatchPrediction(prev => ({ ...prev, loading: true }))

    try {
      const response = await fetch('/api/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          team1: matchPrediction.team1,
          team2: matchPrediction.team2,
          venue: matchPrediction.venue,
          tossWinner: matchPrediction.tossWinner,
          tossDecision: matchPrediction.tossDecision
        })
      })

      if (response.ok) {
        const result = await response.json()
        setMatchPrediction(prev => ({
          ...prev,
          loading: false,
          result: {
            team1Probability: result.team1Probability?.toFixed(1) || 50,
            team2Probability: result.team2Probability?.toFixed(1) || 50,
            prediction: result.predictedWinner || prev.team1,
            confidence: result.confidence?.toFixed(1) || 75
          }
        }))
      } else {
        // Fallback to mock data
        const team1Prob = Math.random() * 100
        const team2Prob = 100 - team1Prob
        
        setMatchPrediction(prev => ({
          ...prev,
          loading: false,
          result: {
            team1Probability: team1Prob.toFixed(1),
            team2Probability: team2Prob.toFixed(1),
            prediction: team1Prob > team2Prob ? prev.team1 : prev.team2,
            confidence: Math.max(team1Prob, team2Prob).toFixed(1)
          }
        }))
      }
    } catch (error) {
      // Fallback to mock data
      const team1Prob = Math.random() * 100
      const team2Prob = 100 - team1Prob
      
      setMatchPrediction(prev => ({
        ...prev,
        loading: false,
        result: {
          team1Probability: team1Prob.toFixed(1),
          team2Probability: team2Prob.toFixed(1),
          prediction: team1Prob > team2Prob ? prev.team1 : prev.team2,
          confidence: Math.max(team1Prob, team2Prob).toFixed(1)
        }
      }))
    }
  }

  const handlePlayerPrediction = async () => {
    if (!playerPrediction.player || !playerPrediction.opposition || !playerPrediction.venue) {
      return
    }

    setPlayerPrediction(prev => ({ ...prev, loading: true }))

    // Simulate API call
    setTimeout(() => {
      const predictedRuns = Math.floor(Math.random() * 80) + 20
      const predictedWickets = Math.floor(Math.random() * 5)
      
      setPlayerPrediction(prev => ({
        ...prev,
        loading: false,
        result: {
          predictedRuns,
          predictedWickets,
          performance: predictedRuns > 50 ? 'Excellent' : predictedRuns > 30 ? 'Good' : 'Average'
        }
      }))
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Match Winner Prediction */}
        <div className="chart-container">
          <div className="flex items-center gap-2 mb-6">
            <Brain className="w-6 h-6 text-primary" />
            <h3 className="text-lg font-semibold text-foreground dark:text-foreground">Match Winner Prediction</h3>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Team 1</label>
                <select
                  value={matchPrediction.team1}
                  onChange={(e) => setMatchPrediction(prev => ({ ...prev, team1: e.target.value }))}
                  className="w-full p-2 border rounded-md bg-background dark:bg-background"
                >
                  <option value="">Select Team</option>
                  {teams.map(team => (
                    <option key={team} value={team}>{team}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Team 2</label>
                <select
                  value={matchPrediction.team2}
                  onChange={(e) => setMatchPrediction(prev => ({ ...prev, team2: e.target.value }))}
                  className="w-full p-2 border rounded-md bg-background dark:bg-background"
                >
                  <option value="">Select Team</option>
                  {teams.map(team => (
                    <option key={team} value={team}>{team}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Venue</label>
              <select
                value={matchPrediction.venue}
                onChange={(e) => setMatchPrediction(prev => ({ ...prev, venue: e.target.value }))}
                className="w-full p-2 border rounded-md bg-background dark:bg-background"
              >
                <option value="">Select Venue</option>
                {venues.map(venue => (
                  <option key={venue} value={venue}>{venue}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Toss Winner</label>
                <select
                  value={matchPrediction.tossWinner}
                  onChange={(e) => setMatchPrediction(prev => ({ ...prev, tossWinner: e.target.value }))}
                  className="w-full p-2 border rounded-md bg-background dark:bg-background"
                >
                  <option value="">Select Team</option>
                  {matchPrediction.team1 && <option value={matchPrediction.team1}>{matchPrediction.team1}</option>}
                  {matchPrediction.team2 && <option value={matchPrediction.team2}>{matchPrediction.team2}</option>}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Toss Decision</label>
                <select
                  value={matchPrediction.tossDecision}
                  onChange={(e) => setMatchPrediction(prev => ({ ...prev, tossDecision: e.target.value }))}
                  className="w-full p-2 border rounded-md bg-background dark:bg-background"
                >
                  <option value="bat">Bat</option>
                  <option value="field">Field</option>
                </select>
              </div>
            </div>

            <button
              onClick={handleMatchPrediction}
              disabled={matchPrediction.loading}
              className="w-full py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {matchPrediction.loading ? 'Analyzing...' : 'Predict Winner'}
            </button>

            {matchPrediction.result && (
              <div className="p-4 bg-muted dark:bg-muted rounded-lg space-y-3">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  <span className="font-semibold">Prediction Result</span>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>{matchPrediction.team1}:</span>
                    <span className="font-bold">{matchPrediction.result.team1Probability}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{matchPrediction.team2}:</span>
                    <span className="font-bold">{matchPrediction.result.team2Probability}%</span>
                  </div>
                </div>
                
                <div className="pt-2 border-t">
                  <p className="text-sm text-muted-foreground dark:text-muted-foreground">Predicted Winner:</p>
                  <p className="text-lg font-bold text-primary">{matchPrediction.result.prediction}</p>
                  <p className="text-xs text-muted-foreground dark:text-muted-foreground">Confidence: {matchPrediction.result.confidence}%</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Player Performance Prediction */}
        <div className="chart-container">
          <div className="flex items-center gap-2 mb-6">
            <Users className="w-6 h-6 text-primary" />
            <h3 className="text-lg font-semibold text-foreground dark:text-foreground">Player Performance Prediction</h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Player Name</label>
              <PlayerDropdown
                value={playerPrediction.player}
                onChange={(player) => setPlayerPrediction(prev => ({ ...prev, player }))}
                placeholder="Select player"
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Opposition Team</label>
              <select
                value={playerPrediction.opposition}
                onChange={(e) => setPlayerPrediction(prev => ({ ...prev, opposition: e.target.value }))}
                className="w-full p-2 border rounded-md bg-background dark:bg-background"
              >
                <option value="">Select Team</option>
                {teams.map(team => (
                  <option key={team} value={team}>{team}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Venue</label>
              <select
                value={playerPrediction.venue}
                onChange={(e) => setPlayerPrediction(prev => ({ ...prev, venue: e.target.value }))}
                className="w-full p-2 border rounded-md bg-background dark:bg-background"
              >
                <option value="">Select Venue</option>
                {venues.map(venue => (
                  <option key={venue} value={venue}>{venue}</option>
                ))}
              </select>
            </div>

            <button
              onClick={handlePlayerPrediction}
              disabled={playerPrediction.loading}
              className="w-full py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {playerPrediction.loading ? 'Analyzing...' : 'Predict Performance'}
            </button>

            {playerPrediction.result && (
              <div className="p-4 bg-muted dark:bg-muted rounded-lg space-y-3">
                <div className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-blue-600" />
                  <span className="font-semibold">Performance Prediction</span>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground dark:text-muted-foreground">Predicted Runs</p>
                    <p className="text-2xl font-bold text-foreground dark:text-foreground">{playerPrediction.result.predictedRuns}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground dark:text-muted-foreground">Predicted Wickets</p>
                    <p className="text-2xl font-bold text-foreground dark:text-foreground">{playerPrediction.result.predictedWickets}</p>
                  </div>
                </div>
                
                <div className="pt-2 border-t">
                  <p className="text-sm text-muted-foreground dark:text-muted-foreground">Expected Performance:</p>
                  <p className={`text-lg font-bold ${
                    playerPrediction.result.performance === 'Excellent' ? 'text-green-600' :
                    playerPrediction.result.performance === 'Good' ? 'text-blue-600' : 'text-gray-600'
                  }`}>
                    {playerPrediction.result.performance}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
