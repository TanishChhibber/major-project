import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export default function ChartTest({ data }) {
  console.log('ChartTest received data:', data)
  
  return (
    <div style={{ padding: '20px' }}>
      <h3>Chart Test - Top Run Scorers</h3>
      
      {/* Debug: Show raw data */}
      <div style={{ marginBottom: '20px', background: '#f5f5f5', padding: '10px' }}>
        <h4>Raw Data:</h4>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>

      {/* Test Chart */}
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} layout="horizontal">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis dataKey="name" type="category" />
          <Tooltip />
          <Bar dataKey="runs" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
