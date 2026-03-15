import React from 'react'
import { 
  Zap, 
  Target, 
  Calendar, 
  Users, 
  Award, 
  TrendingUp, 
  MapPin 
} from 'lucide-react'

export default function SeasonStatsCards({ data }) {
  if (!data) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
        {[...Array(7)].map((_, i) => (
          <div key={i} className="stat-card animate-pulse">
            <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
            <div className="h-8 bg-muted rounded"></div>
          </div>
        ))}
      </div>
    )
  }

  const stats = [
    {
      title: 'Total 6s',
      value: data.totalSixes.toLocaleString(),
      icon: Zap,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    },
    {
      title: 'Total 4s',
      value: data.totalFours.toLocaleString(),
      icon: Target,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Total Matches',
      value: data.totalMatches,
      icon: Calendar,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Total Teams',
      value: data.totalTeams,
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      title: 'Centuries',
      value: data.centuries,
      icon: Award,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100'
    },
    {
      title: 'Half Centuries',
      value: data.halfCenturies,
      icon: TrendingUp,
      color: 'text-pink-600',
      bgColor: 'bg-pink-100'
    },
    {
      title: 'Total Venues',
      value: data.totalVenues,
      icon: MapPin,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-100'
    }
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
      {stats.map((stat, index) => (
        <div 
          key={stat.title} 
          className="stat-card hover:scale-105 transition-transform duration-200"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`${stat.bgColor} p-2 rounded-lg`}>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
          </div>
          
          <div>
            <p className="text-sm text-muted-foreground dark:text-muted-foreground mb-1">{stat.title}</p>
            <p className="text-2xl font-bold text-foreground dark:text-foreground">{stat.value}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
