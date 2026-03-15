import { useState, useEffect } from 'react'

export function useSeasonData(season) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [availableSeasons, setAvailableSeasons] = useState([])

  useEffect(() => {
    const fetchSeasonData = async () => {
      try {
        setLoading(true)
        setError(null)

        // First, fetch available seasons
        const seasonsResponse = await fetch(`/api/seasons`)
        if (seasonsResponse.ok) {
          const seasons = await seasonsResponse.json()
          setAvailableSeasons(seasons.sort((a, b) => b - a)) // Sort descending
          console.log('Available seasons from API:', seasons)
        }

        // Then fetch season data - ensure season is just the year
        const seasonYear = season ? season.match(/\d{4}/)?.[0] || season : season
        console.log(`Fetching data for season: ${seasonYear}`)
        
        const response = await fetch(`/api/season/${seasonYear}`)
        
        if (!response.ok) {
          throw new Error(`Failed to fetch season data: ${response.status}`)
        }

        const seasonData = await response.json()
        console.log('Season data received:', seasonData)
        
        // Log points table specifically
        if (seasonData.pointsTable) {
          console.log('Points table data:', seasonData.pointsTable.slice(0, 5))
        }
        
        // Log chart data
        if (seasonData.charts) {
          console.log('Top run scorers:', seasonData.charts.topRunScorers?.slice(0, 3))
          console.log('Top wicket takers:', seasonData.charts.topWicketTakers?.slice(0, 3))
        }
        
        setData(seasonData)
      } catch (err) {
        console.error('Error fetching season data:', err)
        setError(err.message)
        
        // Fallback to mock data for development
        const mockData = getMockSeasonData(season)
        setData(mockData)
        
        // Set mock seasons if API fails
        const mockSeasons = Array.from({length: 18}, (_, i) => (2025 - i).toString())
        setAvailableSeasons(mockSeasons)
      } finally {
        setLoading(false)
      }
    }

    if (season) {
      fetchSeasonData()
    }
  }, [season])

  return { data, loading, error, availableSeasons }
}

// Mock data generator for development
function getMockSeasonData(season) {
  const teams = [
    { id: 1, name: 'Royal Challengers Bangalore', short: 'RCB', logo: 'https://documents.iplt20.com/ipl/RCB/Logos/Logooutline/RCBoutline.png' },
    { id: 2, name: 'Sunrisers Hyderabad', short: 'SRH', logo: 'https://documents.iplt20.com/ipl/SRH/Logos/Logooutline/SRHoutline.png' },
    { id: 3, name: 'Mumbai Indians', short: 'MI', logo: 'https://documents.iplt20.com/ipl/MI/Logos/Logooutline/MIoutline.png' },
    { id: 4, name: 'Chennai Super Kings', short: 'CSK', logo: 'https://documents.iplt20.com/ipl/CSK/logos/Logooutline/CSKoutline.png' },
    { id: 5, name: 'Kolkata Knight Riders', short: 'KKR', logo: 'https://documents.iplt20.com/ipl/KKR/Logos/Logooutline/KKRoutline.png' },
    { id: 6, name: 'Rajasthan Royals', short: 'RR', logo: 'https://1000logos.net/wp-content/uploads/2024/03/Rajasthan-Royals-Logo-768x432.png' },
    { id: 7, name: 'Delhi Capitals', short: 'DC', logo: 'https://documents.iplt20.com/ipl/DC/Logos/LogoOutline/DCoutline.png' },
    { id: 8, name: 'Punjab Kings', short: 'PK', logo: 'https://documents.iplt20.com/ipl/PBKS/Logos/Logooutline/PBKSoutline.png' }
  ]

  return {
    seasonInfo: {
      season,
      champion: teams[0].name,
      runnerUp: teams[1].name,
      startDate: '2023-03-31',
      endDate: '2023-05-29'
    },
    seasonStats: {
      totalSixes: 872,
      totalFours: 2156,
      totalMatches: 74,
      totalTeams: 10,
      centuries: 12,
      halfCenturies: 89,
      totalVenues: 12
    },
    playerStats: {
      orangeCap: {
        name: 'Virat Kohli',
        team: 'Royal Challengers Bangalore',
        runs: 736,
        matches: 16,
        average: 46.0
      },
      purpleCap: {
        name: 'Mohammed Shami',
        team: 'Gujarat Titans',
        wickets: 28,
        matches: 17,
        average: 15.3
      },
      mostFours: {
        name: 'Shubman Gill',
        team: 'Gujarat Titans',
        fours: 85,
        matches: 16
      },
      mostSixes: {
        name: 'Faf du Plessis',
        team: 'Royal Challengers Bangalore',
        sixes: 36,
        matches: 16
      }
    },
    pointsTable: teams.map((team, index) => ({
      ...team,
      played: 14,
      won: Math.floor(Math.random() * 10) + 3,
      lost: Math.floor(Math.random() * 8) + 2,
      nr: Math.floor(Math.random() * 3),
      tie: Math.floor(Math.random() * 2),
      points: (Math.floor(Math.random() * 10) + 3) * 2,
      nrr: (Math.random() * 2 - 1).toFixed(3)
    })).sort((a, b) => b.points - a.points),
    charts: {
      runsDistribution: teams.map(team => ({
        team: team.short,
        runs: Math.floor(Math.random() * 2000) + 1500
      })),
      boundaryAnalysis: teams.map(team => ({
        team: team.short,
        fours: Math.floor(Math.random() * 200) + 100,
        sixes: Math.floor(Math.random() * 100) + 50
      })),
      topRunScorers: [
        { name: 'Virat Kohli', runs: 736, team: 'RCB' },
        { name: 'Shubman Gill', runs: 680, team: 'GT' },
        { name: 'Faf du Plessis', runs: 650, team: 'RCB' },
        { name: 'Ruturaj Gaikwad', runs: 590, team: 'CSK' },
        { name: 'Yashasvi Jaiswal', runs: 575, team: 'RR' },
        { name: 'David Warner', runs: 520, team: 'DC' },
        { name: 'Suryakumar Yadav', runs: 480, team: 'MI' },
        { name: 'KL Rahul', runs: 450, team: 'LSG' },
        { name: 'Rohit Sharma', runs: 425, team: 'MI' },
        { name: 'Jos Buttler', runs: 400, team: 'RR' }
      ],
      topWicketTakers: [
        { name: 'Mohammed Shami', wickets: 28, team: 'GT' },
        { name: 'Rashid Khan', wickets: 27, team: 'GT' },
        { name: 'Piyush Chawla', wickets: 22, team: 'MI' },
        { name: 'Tushar Deshpande', wickets: 21, team: 'DC' },
        { name: 'Ravindra Jadeja', wickets: 20, team: 'CSK' },
        { name: 'Mohammed Siraj', wickets: 19, team: 'RCB' },
        { name: 'Arshdeep Singh', wickets: 18, team: 'PBKS' },
        { name: 'Yuzvendra Chahal', wickets: 17, team: 'RR' },
        { name: 'Varun Chakaravarthy', wickets: 16, team: 'KKR' },
        { name: 'Kuldeep Yadav', wickets: 15, team: 'DC' }
      ],
      matchOutcomes: {
        winByRuns: 32,
        winByWickets: 40,
        noResult: 2
      }
    }
  }
}
