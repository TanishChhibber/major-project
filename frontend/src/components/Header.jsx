import React from 'react'
import { Trophy, Calendar } from 'lucide-react'
import DarkModeToggle from './DarkModeToggle'

export default function Header({ selectedSeason, onSeasonChange, seasonData, availableSeasons = [] }) {
  // Use available seasons from API, fallback to hardcoded range
  const seasons = availableSeasons.length > 0 
    ? availableSeasons 
    : ['2025', '2024', '2023', '2022', '2021', '2020', '2019', '2018', '2017', '2016', '2015', '2014', '2013', '2012', '2011', '2010', '2009', '2008']

  return (
    <header className="ipl-gradient text-white shadow-lg">
      <div className="container mx-auto px-4 py-8">
        {/* Title Section */}
        <div className="flex justify-between items-start mb-8">
          <div className="text-center flex-1">
            <h1 className="text-4xl md:text-5xl font-bold mb-2 animate-fade-in">
              IPL Analysis Dashboard
            </h1>
            <p className="text-xl opacity-90 animate-slide-up">
              Comprehensive Cricket Analytics & Insights
            </p>
          </div>
          <div className="ml-4">
            <DarkModeToggle />
          </div>
        </div>

        {/* Champion and Runner Up */}
        {seasonData && (
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 mb-8 animate-scale-in">
            <div className="text-center">
              <div className="flex items-center gap-2 mb-2">
                <Trophy className="w-6 h-6 text-yellow-400" />
                <span className="text-lg font-semibold">Champion</span>
              </div>
              <p className="text-2xl font-bold text-yellow-400">{seasonData.champion}</p>
            </div>
            
            <div className="hidden md:block text-3xl opacity-50">VS</div>
            
            <div className="text-center">
              <div className="flex items-center gap-2 mb-2">
                <Trophy className="w-6 h-6 text-gray-300" />
                <span className="text-lg font-semibold">Runner Up</span>
              </div>
              <p className="text-2xl font-bold text-gray-300">{seasonData.runnerUp}</p>
            </div>
          </div>
        )}

        {/* Season Selector */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            <label htmlFor="season-select" className="font-medium">
              Select Season:
            </label>
          </div>
          
          <select
            id="season-select"
            value={selectedSeason}
            onChange={(e) => onSeasonChange(e.target.value)}
            className="px-4 py-2 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-white/50 cursor-pointer hover:bg-white/30 transition-colors"
          >
            {seasons.map(season => (
              <option key={season} value={season} className="text-gray-900">
                IPL {season}
              </option>
            ))}
          </select>
        </div>

        {/* Season Info */}
        {seasonData && (
          <div className="text-center mt-6 text-sm opacity-80">
            <p>
              {new Date(seasonData.startDate).toLocaleDateString()} - {' '}
              {new Date(seasonData.endDate).toLocaleDateString()}
            </p>
          </div>
        )}
      </div>
    </header>
  )
}
