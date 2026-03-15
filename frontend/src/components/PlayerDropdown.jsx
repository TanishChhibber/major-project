import React, { useState, useEffect, useRef } from 'react'
import { ChevronDown } from 'lucide-react'
import { apiFetch } from '../config/api'

export default function PlayerDropdown({ value, onChange, placeholder = "Select player", className = "" }) {
  const [players, setPlayers] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(false)
  const dropdownRef = useRef(null)

  // Fetch players when component mounts
  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        setLoading(true)
        const response = await apiFetch('/api/players')
        if (response.ok) {
          const data = await response.json()
          setPlayers(data.players || [])
          console.log('Loaded players:', data.count)
        } else {
          console.error('Failed to fetch players')
        }
      } catch (error) {
        console.error('Error fetching players:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPlayers()
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Filter players based on search term
  const filteredPlayers = players.filter(player =>
    player.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Handle player selection
  const handlePlayerSelect = (player) => {
    onChange(player)
    setSearchTerm("")
    setIsOpen(false)
  }

  // Handle input changes
  const handleInputChange = (e) => {
    const value = e.target.value
    setSearchTerm(value)
    setIsOpen(true)
    
    // If the input exactly matches a player, update the value
    const exactMatch = players.find(player => 
      player.toLowerCase() === value.toLowerCase()
    )
    if (exactMatch) {
      onChange(exactMatch)
    } else {
      onChange("") // Clear if no exact match
    }
  }

  // Handle focus
  const handleInputFocus = () => {
    setIsOpen(true)
    if (!value) {
      setSearchTerm("")
    }
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Dropdown Input */}
      <div className="relative">
        <input
          type="text"
          value={value || searchTerm}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          placeholder={placeholder}
          className={`w-full p-2 pr-10 border rounded-md bg-background dark:bg-background border-border dark:border-border focus:ring-2 focus:ring-primary focus:border-primary transition-all ${className}`}
          disabled={loading}
        />
        
        {/* Dropdown Icon */}
        <div 
          className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          {loading ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
          ) : (
            <ChevronDown 
              className={`w-4 h-4 text-muted-foreground transition-transform duration-200 hover:text-foreground ${
                isOpen ? 'rotate-180' : ''
              }`}
            />
          )}
        </div>
      </div>

      {/* Dropdown List */}
      {isOpen && !loading && (
        <div className="absolute z-50 w-full mt-1 bg-background dark:bg-background border border-border dark:border-border rounded-md shadow-lg max-h-60 overflow-auto">
          {filteredPlayers.length === 0 ? (
            <div className="p-3 text-muted-foreground text-center">
              {searchTerm ? "No players found" : "No players available"}
            </div>
          ) : (
            filteredPlayers.map((player, index) => (
              <div
                key={index}
                onClick={() => handlePlayerSelect(player)}
                className={`px-3 py-2 cursor-pointer hover:bg-muted dark:hover:bg-muted transition-colors ${
                  value === player ? 'bg-muted dark:bg-muted text-primary' : 'text-foreground dark:text-foreground'
                }`}
              >
                {player}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}
