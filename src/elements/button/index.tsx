// Styles
import './style.css'

// Libs
import React, { PropsWithChildren } from 'react'

// Elements
import Icon from '../icon'
import Text from '../text'

interface Props
  extends React.DetailedHTMLProps<React.AllHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> {
  variant?: 'primary' | 'secondary'
  nextArrow?: boolean
  container?: 'lg' | 'sm'
}

export default function Button({
  children,
  container = 'sm',
  className = '',
  variant = 'primary',
  disabled = false,
  nextArrow = false,
  onClick,
  ...props
}: PropsWithChildren<Props>) {
  const disabledClass = disabled ? 'disabled' : ''
  const nextArrowClass = nextArrow ? 'uiSignupElementsButtonArrow' : ''
  const btn = `uiSignupElementsButton btn ${container === 'lg' ? 'uiSignupElementsButtonLg' : ''}`
  const classes = `${btn} btn-${variant} ${disabledClass} ${nextArrowClass} ${className}`.trim()

  return (
    <a className={classes} {...props} onClick={!disabled ? onClick : undefined}>
      <Text variant="buttonPrimary">{children}</Text>
      {nextArrow && <Icon icon="right-arrow" />}
    </a>
  )
}
