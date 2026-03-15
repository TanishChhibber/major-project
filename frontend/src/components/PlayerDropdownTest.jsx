import React from 'react'
import PlayerDropdown from './PlayerDropdown'

export default function PlayerDropdownTest() {
  const [selectedPlayer, setSelectedPlayer] = React.useState('')

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
      <h2>Player Dropdown Test</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <label className="block text-sm font-medium mb-2">Selected Player:</label>
        <div style={{ 
          padding: '10px', 
          background: '#f5f5f5', 
          borderRadius: '4px',
          fontFamily: 'monospace'
        }}>
          {selectedPlayer || 'No player selected'}
        </div>
      </div>

      <PlayerDropdown
        value={selectedPlayer}
        onChange={setSelectedPlayer}
        placeholder="Select a player"
        className="w-full"
      />
    </div>
  )
}
