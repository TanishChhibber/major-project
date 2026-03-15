import React from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer
} from 'recharts'

export default function ChartsSection({ data }) {
  if (!data || !data.charts) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="chart-container animate-pulse">
            <div className="h-64 bg-muted rounded"></div>
          </div>
        ))}
      </div>
    )
  }

  const { charts } = data

  // Ensure chart data exists and is valid
  const safeChartData = {
    runsDistribution: (charts.runsDistribution || []).map(item => ({
      team: item?.team || 'Unknown',
      runs: parseInt(item?.runs) || 0
    })),
    boundaryAnalysis: (charts.boundaryAnalysis || []).map(item => ({
      team: item?.team || 'Unknown',
      fours: parseInt(item?.fours) || 0,
      sixes: parseInt(item?.sixes) || 0
    })),
    topRunScorers: (charts.topRunScorers || []).map(item => ({
      name: item?.name || 'Unknown',
      runs: parseInt(item?.runs) || 0,
      team: item?.team || 'NA'
    })),
    topWicketTakers: (charts.topWicketTakers || []).map(item => ({
      name: item?.name || 'Unknown',
      wickets: parseInt(item?.wickets) || 0,
      team: item?.team || 'NA'
    })),
    matchOutcomes: {
      winByRuns: parseInt(charts.matchOutcomes?.winByRuns) || 0,
      winByWickets: parseInt(charts.matchOutcomes?.winByWickets) || 0,
      noResult: parseInt(charts.matchOutcomes?.noResult) || 0
    }
  }

  // Enhanced Debug logging - Check data structure and types
  console.log('🔍 ChartsSection - Raw charts data:', charts)
  console.log('📊 ChartsSection - Top Run Scorers:', safeChartData.topRunScorers)
  console.log('🎯 ChartsSection - Top Wicket Takers:', safeChartData.topWicketTakers)
  
  // Detailed data structure validation
  console.log('📈 Run Scorers Data Validation:')
  safeChartData.topRunScorers.forEach((player, index) => {
    console.log(`  ${index + 1}. ${player.name}: ${player.runs} runs (type: ${typeof player.runs})`)
  })
  
  console.log('🏏 Wicket Takers Data Validation:')
  safeChartData.topWicketTakers.forEach((player, index) => {
    console.log(`  ${index + 1}. ${player.name}: ${player.wickets} wickets (type: ${typeof player.wickets})`)
  })

  // Check if data has valid numeric values
  const hasValidRunData = safeChartData.topRunScorers.some(p => p.runs > 0)
  const hasValidWicketData = safeChartData.topWicketTakers.some(p => p.wickets > 0)
  
  console.log('✅ Data Validation Results:')
  console.log(`  Has valid run data: ${hasValidRunData}`)
  console.log(`  Has valid wicket data: ${hasValidWicketData}`)
  console.log(`  Run scorers count: ${safeChartData.topRunScorers.length}`)
  console.log(`  Wicket takers count: ${safeChartData.topWicketTakers.length}`)

  // Colors for pie chart
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

  // Custom tooltip for charts
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border rounded-lg p-3 shadow-lg">
          <p className="font-semibold">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: {entry.value.toLocaleString()}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <div className="space-y-6">
      {/* Runs Distribution */}
      <div className="chart-container">
        <h3 className="text-lg font-semibold mb-4 dark:text-foreground">Runs Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={safeChartData.runsDistribution}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="team" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="runs" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Boundary Analysis */}
      <div className="chart-container">
        <h3 className="text-lg font-semibold mb-4 dark:text-foreground">Boundary Analysis</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={safeChartData.boundaryAnalysis}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="team" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="fours" stackId="a" fill="#82ca9d" name="4s" />
            <Bar dataKey="sixes" stackId="a" fill="#ffc658" name="6s" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Run Scorers */}
        <div className="chart-container">
          <h3 className="text-lg font-semibold mb-4 dark:text-foreground">Top 10 Run Scorers</h3>
          {safeChartData.topRunScorers.length > 0 ? (
            <>
              <div className="text-xs text-muted-foreground mb-2">
                Showing {safeChartData.topRunScorers.length} players
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart 
                  data={safeChartData.topRunScorers} 
                  layout="horizontal"
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    type="number" 
                    domain={[0, 'dataMax']}
                    tickFormatter={(value) => value.toString()}
                  />
                  <YAxis 
                    dataKey="name" 
                    type="category" 
                    width={80}
                    tick={{ fontSize: 12 }}
                  />
                  <Tooltip 
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-card border rounded-lg p-2 shadow-lg">
                            <p className="font-semibold">{payload[0].payload.name}</p>
                            <p className="text-sm">Runs: {payload[0].value}</p>
                            <p className="text-xs text-muted-foreground">{payload[0].payload.team}</p>
                          </div>
                        )
                      }
                      return null
                    }}
                  />
                  <Bar 
                    dataKey="runs" 
                    fill="#8884d8" 
                    radius={[0, 4, 4, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </>
          ) : (
            <div className="flex items-center justify-center h-64">
              <p className="text-muted-foreground">No run scorer data available</p>
            </div>
          )}
        </div>

        {/* Top Wicket Takers */}
        <div className="chart-container">
          <h3 className="text-lg font-semibold mb-4 dark:text-foreground">Top Wicket Takers</h3>
          {safeChartData.topWicketTakers.length > 0 ? (
            <>
              <div className="text-xs text-muted-foreground mb-2">
                Showing {safeChartData.topWicketTakers.length} players
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart 
                  data={safeChartData.topWicketTakers} 
                  layout="horizontal"
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    type="number" 
                    domain={[0, 'dataMax']}
                    tickFormatter={(value) => value.toString()}
                  />
                  <YAxis 
                    dataKey="name" 
                    type="category" 
                    width={80}
                    tick={{ fontSize: 12 }}
                  />
                  <Tooltip 
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-card border rounded-lg p-2 shadow-lg">
                            <p className="font-semibold">{payload[0].payload.name}</p>
                            <p className="text-sm">Wickets: {payload[0].value}</p>
                            <p className="text-xs text-muted-foreground">{payload[0].payload.team}</p>
                          </div>
                        )
                      }
                      return null
                    }}
                  />
                  <Bar 
                    dataKey="wickets" 
                    fill="#82ca9d" 
                    radius={[0, 4, 4, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </>
          ) : (
            <div className="flex items-center justify-center h-64">
              <p className="text-muted-foreground">No wicket taker data available</p>
            </div>
          )}
        </div>
      </div>

      {/* Match Outcome Distribution */}
      <div className="chart-container">
        <h3 className="text-lg font-semibold mb-4 dark:text-foreground">Match Outcome Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={[
                { name: 'Win by Runs', value: safeChartData.matchOutcomes.winByRuns },
                { name: 'Win by Wickets', value: safeChartData.matchOutcomes.winByWickets },
                { name: 'No Result', value: safeChartData.matchOutcomes.noResult }
              ]}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {[
                { name: 'Win by Runs', value: safeChartData.matchOutcomes.winByRuns },
                { name: 'Win by Wickets', value: safeChartData.matchOutcomes.winByWickets },
                { name: 'No Result', value: safeChartData.matchOutcomes.noResult }
              ].map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
