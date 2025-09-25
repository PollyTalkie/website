import React from 'react'

interface LogoProps {
  className?: string
  size?: number
  locale?: string
}

export function Logo({ className = "", size = 40, locale = "en" }: LogoProps) {
  // Define aspect ratio to maintain image proportions
  const height = Math.round(size * 1) // Adjust this multiplier based on your logo's aspect ratio
  
  // Set alt text based on language
  const altText = locale === 'zh' ? '博语通 (PollyTalkie) 标志' : 'PollyTalkie Logo'

  return (
    <div className={`relative ${className}`} style={{ width: size, height }}>
      <img
        src="/logo.png"
        alt={altText}
        className="object-contain w-full h-full"
        width={size}
        height={height}
      />
    </div>
  )
}
