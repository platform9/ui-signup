import React from 'react'
import './style.css'

const icons = {
  check: '\u2713',
  'right-arrow': '\u27A6',
  'left-arrow': '\u2190',
  close: '\uf00d',
}

interface Props extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> {
  icon: keyof typeof icons
  size?: number
  className?: string
  color?: string
}

export default function Icon({ icon, size = 16, color = '', className = '', ...props }: Props) {
  return (
    <i
      style={{ fontSize: size }}
      className={`uiSignupElementsIcon${color} ${className}`}
      {...props}
    >
      {icons[icon]}
    </i>
  )
}
