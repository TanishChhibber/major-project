import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import SeasonStatsCards from './components/SeasonStatsCards'
import PlayerStatsCards from './components/PlayerStatsCards'
import PointsTable from './components/PointsTable'
import ChartsSection from './components/ChartsSection'
import MLPredictions from './components/MLPredictions'
import CricketStatsCards from './components/CricketStatsCards'
import ErrorBoundary from './components/ErrorBoundary'
import { useSeasonData } from './hooks/useSeasonData'

function App() {
  const [selectedSeason, setSelectedSeason] = useState('2023')
  const [viewMode, setViewMode] = useState('dashboard') // 'dashboard' or 'modern'
  const { data, loading, error, availableSeasons } = useSeasonData(selectedSeason)

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading IPL data...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-destructive mb-4">Error loading IPL data</p>
          <p className="text-muted-foreground">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-background transition-colors duration-300">
        <Header 
          selectedSeason={selectedSeason}
          onSeasonChange={setSelectedSeason}
          seasonData={data?.seasonInfo}
          availableSeasons={availableSeasons}
        />
        
        {/* View Toggle Button */}
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-center">
            <button
              onClick={() => setViewMode(viewMode === 'dashboard' ? 'modern' : 'dashboard')}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              {viewMode === 'dashboard' ? '🎯 Modern Stats View' : '📊 Classic Dashboard'}
            </button>
          </div>
        </div>
        
        {/* Conditional Rendering */}
        {viewMode === 'modern' ? (
          <CricketStatsCards 
            centuries={data?.seasonStats?.centuries || 7}
            halfCenturies={data?.seasonStats?.halfCenturies || 15}
          />
        ) : (
          <main className="container mx-auto px-4 py-8 space-y-8">
            {/* Season Statistics Cards */}
            <section className="animate-fade-in">
              <h2 className="text-2xl font-bold mb-6 text-foreground dark:text-foreground">Season Statistics</h2>
              <SeasonStatsCards data={data?.seasonStats} />
            </section>

          {/* Player Statistics Cards */}
          <section className="animate-fade-in">
            <h2 className="text-2xl font-bold mb-6 text-foreground dark:text-foreground">Player Performance</h2>
            <PlayerStatsCards data={data?.playerStats} />
          </section>

          {/* Points Table */}
          <section className="animate-fade-in">
            <h2 className="text-2xl font-bold mb-6 text-foreground dark:text-foreground">Points Table</h2>
            <PointsTable data={data?.pointsTable} />
          </section>

          {/* Charts Section */}
          <section className="animate-fade-in">
            <h2 className="text-2xl font-bold mb-6 text-foreground dark:text-foreground">Analytics & Visualizations</h2>
            <ChartsSection data={data} />
          </section>

          {/* ML Predictions */}
          <section className="animate-fade-in">
            <h2 className="text-2xl font-bold mb-6 text-foreground dark:text-foreground">ML Predictions 2026</h2>
            <MLPredictions seasonData={data} />
          </section>
        </main>
        )}
      </div>
    </ErrorBoundary>
  )
}

export default App
