// Styles
import './style.css'

// Libs
import React, { PropsWithChildren } from 'react'

type Typography =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'subtitle1'
  | 'inputPlaceholder'
  | 'subtitle2'
  | 'nav'
  | 'buttonPrimary'
  | 'body1'
  | 'h4'
  | 'caption1'
  | 'buttonSecondary'
  | 'inputTable'
  | 'body2'
  | 'sidenav'
  | 'inputLabel'
  | 'caption2'
  | 'caption4'
  | 'caption3'
export interface TextProps {
  className?: string
  variant?: Typography
  fixWhitespace?: boolean
}

export default function Text({
  children,
  variant = 'body1',
  className = 'uiSignupElementsTextGrey000',
  fixWhitespace = true,
  ...props
}: PropsWithChildren<TextProps>) {
  const whitespaceClass = fixWhitespace ? 'uiSignupElementsTextWhitespaceFix' : ''
  const typographyClass = `uiSignupElementsText${variant}`
  const classes = `uiSignupElementsText ${typographyClass} ${whitespaceClass} ${className}`.trim()
  return (
    <span className={classes} {...props}>
      {children}
    </span>
  )
}
