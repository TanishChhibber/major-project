import React from 'react'
import { Trophy, TrendingUp } from 'lucide-react'

export default function CricketStatsCards({ centuries = 5, halfCenturies = 12 }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">
            Cricket Analytics
          </h1>
          <p className="text-blue-200 text-lg">
            Performance Statistics Dashboard
          </p>
        </div>

        {/* Stats Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Centuries Card */}
          <div className="relative group">
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
            
            {/* Card */}
            <div className="relative bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-lg rounded-2xl p-8 border border-slate-700/50 shadow-2xl hover:shadow-amber-500/10 transition-all duration-300 hover:scale-[1.02]">
              {/* Icon Container */}
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl mb-6 shadow-lg">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              
              {/* Content */}
              <div className="text-center">
                <h3 className="text-slate-300 text-sm font-medium uppercase tracking-wider mb-2">
                  Centuries
                </h3>
                <div className="text-5xl font-bold text-white mb-2">
                  {centuries}
                </div>
                <div className="text-slate-400 text-sm">
                  Match-winning hundreds
                </div>
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute top-4 right-4 w-2 h-2 bg-amber-400 rounded-full opacity-60"></div>
              <div className="absolute bottom-4 left-4 w-1 h-1 bg-amber-400 rounded-full opacity-40"></div>
            </div>
          </div>

          {/* Half Centuries Card */}
          <div className="relative group">
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-rose-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
            
            {/* Card */}
            <div className="relative bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-lg rounded-2xl p-8 border border-slate-700/50 shadow-2xl hover:shadow-pink-500/10 transition-all duration-300 hover:scale-[1.02]">
              {/* Icon Container */}
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-pink-400 to-rose-500 rounded-2xl mb-6 shadow-lg">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              
              {/* Content */}
              <div className="text-center">
                <h3 className="text-slate-300 text-sm font-medium uppercase tracking-wider mb-2">
                  Half Centuries
                </h3>
                <div className="text-5xl font-bold text-white mb-2">
                  {halfCenturies}
                </div>
                <div className="text-slate-400 text-sm">
                  Consistent performances
                </div>
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute top-4 right-4 w-2 h-2 bg-pink-400 rounded-full opacity-60"></div>
              <div className="absolute bottom-4 left-4 w-1 h-1 bg-pink-400 rounded-full opacity-40"></div>
            </div>
          </div>
        </div>

        {/* Additional Stats Section */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-8 text-slate-400">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-amber-400 rounded-full"></div>
              <span className="text-sm">Elite Performance</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-pink-400 rounded-full"></div>
              <span className="text-sm">Consistent Scoring</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
