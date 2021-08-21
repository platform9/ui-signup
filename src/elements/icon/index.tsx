import React from 'react'

const icons = {
  check: '\u2713',
  'arrow-right': '\uf01a',
  close: '\uf00d',
}

interface Props {
  icon: keyof typeof icons
  size?: number
  color?: string
}

export default function Icon({ icon, size = 16, color = '' }: Props) {
  return (
    <i style={{ fontSize: size }} className={`uiSignupElementsIcon${color}`}>
      {icons[icon]}
    </i>
  )
}
