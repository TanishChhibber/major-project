import React, { useState } from 'react'
import '../styles/team-logos.css'

export default function SafeImage({ src, alt, className, fallbackText = 'IMG' }) {
  const [imgError, setImgError] = useState(false)
  const [imgLoaded, setImgLoaded] = useState(false)

  const handleError = (e) => {
    setImgError(true)
    e.target.style.display = 'none'
    // Show fallback element
    if (e.target.nextSibling) {
      e.target.nextSibling.style.display = 'flex'
    }
  }

  const handleLoad = () => {
    setImgLoaded(true)
  }

  return (
    <>
      <img
        src={src}
        alt={alt || fallbackText}
        className={className}
        onError={handleError}
        onLoad={handleLoad}
        style={{
          display: imgError ? 'none' : 'block',
          opacity: imgLoaded ? 1 : 0.7,
          transition: 'opacity 0.3s ease'
        }}
      />
      {/* Fallback for when image fails to load */}
      <div
        className={`${className} flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-500 text-white font-bold text-xs rounded`}
        style={{
          display: imgError ? 'flex' : 'none',
          objectFit: 'contain'
        }}
      >
        {typeof fallbackText === 'string' 
          ? fallbackText.substring(0, 2).toUpperCase()
          : 'IMG'
        }
      </div>
    </>
  )
}

export function TeamLogo({ teamName, teamShort, size = "md", className = "" }) {
  // Size classes
  const sizeClasses = {
    xs: "w-4 h-4 text-xs",
    sm: "w-6 h-6 text-xs", 
    md: "w-8 h-8 text-xs",
    lg: "w-10 h-10 text-sm",
    xl: "w-12 h-12 text-sm"
  }

  const finalClassName = `${sizeClasses[size] || sizeClasses.md} ${className}`

  // IPL team logos mapping - Use existing SVG files
  const TEAM_LOGOS = {
    "Gujarat Titans": "/logos/gt.svg",
    "Chennai Super Kings": "/logos/csk.svg",
    "Mumbai Indians": "/logos/mi.svg",
    "Lucknow Super Giants": "/logos/lsg.svg",
    "Royal Challengers Bangalore": "/logos/rcb.svg",
    "Rajasthan Royals": "/logos/rr.svg",
    "Punjab Kings": "/logos/pbks.svg",
    "Kolkata Knight Riders": "/logos/kkr.svg",
    "Delhi Capitals": "/logos/dc.svg",
    "Sunrisers Hyderabad": "/logos/srh.svg"
  }

  // Simple color-coded team initials fallback
  const teamColors = {
    'MI': 'from-blue-600 to-blue-800',      // Mumbai Indians
    'CSK': 'from-yellow-500 to-yellow-700',  // Chennai Super Kings
    'RCB': 'from-red-500 to-red-700',        // Royal Challengers Bangalore
    'KKR': 'from-purple-600 to-purple-800',  // Kolkata Knight Riders
    'SRH': 'from-orange-500 to-orange-700',  // Sunrisers Hyderabad
    'RR': 'from-pink-500 to-pink-700',       // Rajasthan Royals
    'PK': 'from-red-600 to-red-800',         // Punjab Kings
    'DC': 'from-blue-500 to-blue-700',       // Delhi Capitals
    'GT': 'from-indigo-600 to-indigo-800',   // Gujarat Titans
    'LSG': 'from-blue-400 to-blue-600'       // Lucknow Super Giants
  }

  const colorClass = teamColors[teamShort?.toUpperCase()] || 'from-gray-500 to-gray-700'

  // Get logo URL based on team name
  const logoUrl = TEAM_LOGOS[teamName]
  
  // Debug logging - enhanced for troubleshooting
  console.log('🔍 TeamLogo Debug:', {
    teamName,
    teamShort,
    logoUrl,
    hasLogoUrl: !!logoUrl,
    teamNameType: typeof teamName,
    teamNameLength: teamName?.length,
    availableLogos: Object.keys(TEAM_LOGOS),
    exactMatch: TEAM_LOGOS[teamName],
    trimmedMatch: TEAM_LOGOS[teamName?.trim()],
    logoUrlStart: logoUrl?.substring(0, 50) + '...',
    logoFileExtension: logoUrl?.split('.').pop()
  })

  // If logo exists, try to show it, otherwise show fallback
  if (logoUrl) {
    return (
      <div className="relative">
        <img
          src={logoUrl}
          alt={teamName}
          className={`team-logo ${finalClassName}`}
          style={{ zIndex: 1 }}
          onError={(e) => {
            console.log('❌ Logo failed to load:', logoUrl);
            // Hide image and show fallback
            e.target.style.display = 'none';
            if (e.target.nextSibling) {
              e.target.nextSibling.style.display = 'flex';
            }
          }}
          onLoad={(e) => {
            console.log('✅ Logo loaded successfully:', logoUrl);
            // Hide the fallback when image loads
            if (e.target.nextSibling) {
              e.target.nextSibling.style.display = 'none';
            }
          }}
        />
        {/* Fallback element - positioned behind the image */}
        <div 
          className={`${finalClassName} flex items-center justify-center bg-gradient-to-br ${colorClass} text-white font-bold rounded shadow-sm absolute inset-0`}
          style={{ zIndex: 0 }}
        >
          {teamShort ? teamShort.substring(0, 2).toUpperCase() : 'TM'}
        </div>
      </div>
    )
  }

  // Fallback to colored initials if no logo mapping exists
  return (
    <div className={`${finalClassName} flex items-center justify-center bg-gradient-to-br ${colorClass} text-white font-bold rounded shadow-sm`}>
      {teamShort ? teamShort.substring(0, 2).toUpperCase() : 'TM'}
    </div>
  )
}
