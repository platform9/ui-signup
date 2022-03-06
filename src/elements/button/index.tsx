// Styles
import './style.css'

// Libs
import React, { PropsWithChildren } from 'react'

// Elements
import Icon, { ValidIcons } from '../icon'
import Text from '../text'

interface Props
  extends React.DetailedHTMLProps<React.AllHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> {
  variant?: 'primary' | 'secondary'
  icon?: ValidIcons
  container?: 'lg' | 'sm'
}

export default function Button({
  children,
  container = 'sm',
  className = '',
  variant = 'primary',
  disabled = false,
  icon = undefined,
  onClick,
  ...props
}: PropsWithChildren<Props>) {
  const disabledClass = disabled ? 'disabled' : ''
  const iconClass = !!icon ? 'uiSignupElementsButtonIcon' : ''
  const btn = `uiSignupElementsButton btn ${container === 'lg' ? 'uiSignupElementsButtonLg' : ''}`
  const classes = `${btn} btn-${variant} ${disabledClass} ${iconClass} ${className}`.trim()

  return (
    <a className={classes} {...props} onClick={!disabled ? onClick : undefined}>
      <Text variant="buttonPrimary">{children}</Text>
      {icon && <Icon icon={icon} />}
    </a>
  )
}
