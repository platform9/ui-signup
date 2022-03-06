// Styles
import './style.css'

// Libs
import React from 'react'

// App
import { pxToRem } from '../../helpers'
import RightArrow from './icons/right-arrow'
import LeftArrow from './icons/left-arrow'
import Info from './icons/info'
import Done from './icons/done'
import Download from './icons/download'

export type ValidIcons = keyof typeof icons

interface Props extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> {
  icon: keyof typeof icons
  size?: number
  className?: string
  color?: string
}

export default function Icon({
  icon,
  size = 16,
  color = undefined,
  className = '',
  ...props
}: Props) {
  const remSize = pxToRem(size)
  const IconSvg = icons[icon]
  return (
    <i
      style={{ width: 'max-content', height: remSize }}
      className={`uiSignupElementsIcon ${className}`}
      {...props}
    >
      <IconSvg size={size} color={color} />
    </i>
  )
}

const icons = {
  'right-arrow': RightArrow,
  'left-arrow': LeftArrow,
  info: Info,
  done: Done,
  download: Download,
}
