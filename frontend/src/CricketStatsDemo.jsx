import React, { useState } from 'react'
import CricketStatsCards from './components/CricketStatsCards'

function CricketStatsDemo() {
  const [stats, setStats] = useState({
    centuries: 7,
    halfCenturies: 15
  })

  // Simulate dynamic data updates
  const updateStats = () => {
    setStats({
      centuries: Math.floor(Math.random() * 8) + 3, // 3-10
      halfCenturies: Math.floor(Math.random() * 15) + 8 // 8-22
    })
  }

  return (
    <div className="relative">
      <CricketStatsCards 
        centuries={stats.centuries} 
        halfCenturies={stats.halfCenturies} 
      />
      
      {/* Demo Controls */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={updateStats}
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        >
          Update Stats
        </button>
      </div>
    </div>
  )
}

export default CricketStatsDemo
