import React from 'react'
import { Crown, Target, Zap, Trophy } from 'lucide-react'

export default function PlayerStatsCards({ data }) {
  if (!data) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="player-card animate-pulse">
            <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
            <div className="h-6 bg-muted rounded w-1/2 mb-4"></div>
            <div className="h-4 bg-muted rounded w-full"></div>
          </div>
        ))}
      </div>
    )
  }

  const playerStats = [
    {
      title: 'Orange Cap',
      icon: Crown,
      color: 'text-orange-500',
      bgColor: 'bg-orange-100 dark:bg-orange-900/20',
      borderColor: 'border-orange-200 dark:border-orange-800',
      player: data.orangeCap || { name: 'TBD', team: 'TBD', runs: 0, matches: 0, average: 0 },
      statLabel: 'runs',
      statValue: data.orangeCap?.runs || 0,
      additionalInfo: `${data.orangeCap?.matches || 0} matches | Avg: ${data.orangeCap?.average || 0}`
    },
    {
      title: 'Purple Cap',
      icon: Crown,
      color: 'text-purple-500',
      bgColor: 'bg-purple-100 dark:bg-purple-900/20',
      borderColor: 'border-purple-200 dark:border-purple-800',
      player: data.purpleCap || { name: 'TBD', team: 'TBD', wickets: 0, matches: 0, average: 0 },
      statLabel: 'wickets',
      statValue: data.purpleCap?.wickets || 0,
      additionalInfo: `${data.purpleCap?.matches || 0} matches | Avg: ${data.purpleCap?.average || 0}`
    },
    {
      title: 'Most Centuries',
      icon: Trophy,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-100 dark:bg-yellow-900/20',
      borderColor: 'border-yellow-200 dark:border-yellow-800',
      player: data.mostCenturies || { name: 'TBD', team: 'TBD', centuries: 0, matches: 0 },
      statLabel: 'centuries',
      statValue: data.mostCenturies?.centuries || 0,
      additionalInfo: `${data.mostCenturies?.matches || 0} matches`
    },
    {
      title: 'Most Fifties',
      icon: Target,
      color: 'text-blue-500',
      bgColor: 'bg-blue-100 dark:bg-blue-900/20',
      borderColor: 'border-blue-200 dark:border-blue-800',
      player: data.mostFifties || { name: 'TBD', team: 'TBD', fifties: 0, matches: 0 },
      statLabel: 'fifties',
      statValue: data.mostFifties?.fifties || 0,
      additionalInfo: `${data.mostFifties?.matches || 0} matches`
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {playerStats.map((stat, index) => (
        <div 
          key={stat.title}
          className={`player-card ${stat.bgColor} ${stat.borderColor} border-2 hover:scale-105 transition-all duration-300`}
          style={{ animationDelay: `${index * 150}ms` }}
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-2">
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
              <h3 className="text-lg font-bold text-foreground dark:text-foreground">{stat.title}</h3>
            </div>
            {stat.title.includes('Cap') && (
              <Trophy className={`w-5 h-5 ${stat.color}`} />
            )}
          </div>
          
          <div className="space-y-3">
            <div>
              <p className="text-xl font-bold text-foreground dark:text-foreground">
                {stat.player.name}
              </p>
              <p className="text-sm text-muted-foreground dark:text-muted-foreground">
                {stat.player.team}
              </p>
            </div>
            
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-foreground dark:text-foreground">
                {stat.statValue}
              </span>
              <span className="text-sm text-muted-foreground dark:text-muted-foreground">
                {stat.statLabel}
              </span>
            </div>
            
            <p className="text-xs text-muted-foreground dark:text-muted-foreground">
              {stat.additionalInfo}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
