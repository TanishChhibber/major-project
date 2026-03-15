import React from 'react'
import SafeImage, { TeamLogo } from './SafeImage'

export default function PointsTable({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="points-table">
        <div className="p-6">
          <div className="text-center text-muted-foreground">
            <p>No points table data available for this season</p>
          </div>
        </div>
      </div>
    )
  }

  console.log('PointsTable received data:', data.slice(0, 3))

  return (
    <div className="points-table">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border dark:border-border">
              <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground dark:text-muted-foreground">Pos</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground dark:text-muted-foreground">Team</th>
              <th className="text-center py-3 px-4 text-sm font-semibold text-muted-foreground dark:text-muted-foreground">Pld</th>
              <th className="text-center py-3 px-4 text-sm font-semibold text-muted-foreground dark:text-muted-foreground">Won</th>
              <th className="text-center py-3 px-4 text-sm font-semibold text-muted-foreground dark:text-muted-foreground">Lost</th>
              <th className="text-center py-3 px-4 text-sm font-semibold text-muted-foreground dark:text-muted-foreground">Tie</th>
              <th className="text-center py-3 px-4 text-sm font-semibold text-muted-foreground dark:text-muted-foreground">NR</th>
              <th className="text-center py-3 px-4 text-sm font-semibold text-muted-foreground dark:text-muted-foreground">NRR</th>
              <th className="text-center py-3 px-4 text-sm font-semibold text-muted-foreground dark:text-muted-foreground">Pts</th>
            </tr>
          </thead>
          <tbody>
            {data.map((team, index) => (
              <tr key={team.id || index} className="border-b border-border/50 dark:border-border/50 hover:bg-muted/50 dark:hover:bg-muted/50 transition-colors">
                <td className="py-3 px-4">
                  <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${
                    index === 0 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                    index === 1 ? 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200' :
                    index === 2 ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200' :
                    'bg-muted text-muted-foreground dark:bg-muted dark:text-muted-foreground'
                  }`}>
                    {index + 1}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <div className="team-cell">
                    <TeamLogo teamName={team.name || team.team_name} teamShort={team.short || team.team_name_short || 'TM'} size="sm" />
                    <div className="team-info">
                      <div className="team-name">{team.name || team.team_name || 'Unknown Team'}</div>
                      <div className="team-code">{team.short || team.team_name_short || 'NA'}</div>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4 text-center font-medium text-foreground dark:text-foreground">{team.played || 0}</td>
                <td className="py-3 px-4 text-center font-medium text-green-600 dark:text-green-400">{team.won || 0}</td>
                <td className="py-3 px-4 text-center font-medium text-red-600 dark:text-red-400">{team.lost || 0}</td>
                <td className="py-3 px-4 text-center font-medium text-yellow-600 dark:text-yellow-400">{team.tie || 0}</td>
                <td className="py-3 px-4 text-center font-medium text-blue-600 dark:text-blue-400">{team.nr || 0}</td>
                <td className="py-3 px-4 text-center font-medium text-foreground dark:text-foreground">{team.nrr ? team.nrr.toFixed(3) : '0.000'}</td>
                <td className="py-3 px-4 text-center">
                  <span className="inline-flex items-center justify-center px-3 py-1 rounded-full text-sm font-bold bg-primary text-primary-foreground dark:bg-primary dark:text-primary-foreground">
                    {team.points || 0}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Legend */}
      <div className="p-4 bg-muted/30 border-t">
        <div className="flex flex-wrap gap-4 text-xs text-muted-foreground justify-center">
          <span>Pld: Played</span>
          <span>NR: No Result</span>
          <span>NRR: Net Run Rate</span>
        </div>
      </div>
    </div>
  )
}
