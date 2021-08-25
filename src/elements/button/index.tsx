import React, { PropsWithChildren } from 'react'
import Icon from '../icon'
import Text from '../text'
import './style.css'

interface Props
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  > {
  variant?: 'primary' | 'secondary'
  nextArrow?: boolean
}

export default function Button({
  children,
  className = '',
  variant = 'primary',
  disabled = false,
  nextArrow = false,
  onClick,
  ...props
}: PropsWithChildren<Props>) {
  const disabledClass = disabled ? 'disabled' : ''
  const nextArrowClass = nextArrow ? 'uiSignupElementsButtonArrow' : ''
  const classes =
    `uiSignupElementsButton btn btn-${variant} ${disabledClass} ${nextArrowClass} ${className}`.trim()
  return (
    <a className={classes} {...props} onClick={!disabled ? onClick : undefined}>
      <Text variant="buttonPrimary">{children}</Text>
      {nextArrow && <Icon icon="right-arrow" />}
    </a>
  )
}
