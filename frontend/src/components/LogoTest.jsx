import React from 'react'

// Official IPL team logos mapping
const TEAM_LOGOS = {
  "Mumbai Indians": "/logos/umbai_indians.webp.webp",
  "Chennai Super Kings": "/logos/chennai_super_kings.webp.webp",
  "Royal Challengers Bangalore": "/logos/royal_challengers_bangalore.webp.webp",
  "Kolkata Knight Riders": "/logos/kolkata_knight_riders.webp.webp",
  "Rajasthan Royals": "/logos/rajasthan_royals.png.png",
  "Delhi Capitals": "/logos/delhi_capitals.webp.webp",
  "Punjab Kings": "/logos/punjab_kings.webp.webp",
  "Sunrisers Hyderabad": "/logos/sunrisers_hyderabad.webp",
  "Gujarat Titans": "/logos/Gujarat Titans.webp",
  "Lucknow Super Giants": "/logos/lucknow_super_giants.webp.webp"
}

export default function LogoTest() {
  return (
    <div style={{ padding: '20px', background: '#1a1a1a', color: 'white', minHeight: '100vh' }}>
      <h1>IPL Team Logo Test</h1>
      <p>Testing official Wikipedia logo URLs...</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '20px' }}>
        {Object.entries(TEAM_LOGOS).map(([teamName, logoUrl]) => (
          <div key={teamName} style={{ 
            background: '#2a2a2a', 
            padding: '15px', 
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            <h3 style={{ marginBottom: '10px', fontSize: '14px' }}>{teamName}</h3>
            <img
              src={logoUrl}
              alt={teamName}
              style={{
                width: '60px',
                height: '60px',
                objectFit: 'contain',
                borderRadius: '4px',
                background: 'white',
                padding: '5px',
                marginBottom: '10px'
              }}
              onLoad={(e) => {
                console.log(`✅ ${teamName} loaded successfully`)
                e.target.style.border = '2px solid #4CAF50'
              }}
              onError={(e) => {
                console.log(`❌ ${teamName} failed to load`)
                e.target.style.border = '2px solid #f44336'
                e.target.alt = 'FAILED'
              }}
            />
            <div style={{ fontSize: '12px', color: '#888', wordBreak: 'break-all' }}>
              {logoUrl.substring(0, 40)}...
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
