import React from 'react'

export default function LoadingSkeleton({ className = "" }) {
  return (
    <div className={`animate-pulse ${className}`}>
      <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
      <div className="h-6 bg-muted rounded w-1/2 mb-4"></div>
      <div className="h-4 bg-muted rounded w-full"></div>
    </div>
  )
}

export function CardSkeleton() {
  return (
    <div className="stat-card animate-pulse">
      <div className="h-8 w-8 bg-muted rounded-full mb-4"></div>
      <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
      <div className="h-8 bg-muted rounded w-1/2"></div>
    </div>
  )
}

export function TableSkeleton({ rows = 5 }) {
  return (
    <div className="points-table">
      <div className="p-6">
        <div className="space-y-4">
          {[...Array(rows)].map((_, i) => (
            <div key={i} className="flex items-center gap-4 p-4 bg-muted animate-pulse">
              <div className="w-8 h-8 bg-muted rounded-full"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-muted rounded w-1/3"></div>
                <div className="h-3 bg-muted rounded w-2/3"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function ChartSkeleton() {
  return (
    <div className="chart-container animate-pulse">
      <div className="h-64 bg-muted rounded"></div>
    </div>
  )
}
