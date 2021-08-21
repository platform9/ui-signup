import React, { PropsWithChildren } from 'react'

interface Props {
  className?: string
  variant?: keyof typeof typography
}

export default function Text({
  children,
  variant = 'body1',
  className = 'uiSignupElementsText',
  ...props
}: PropsWithChildren<Props>) {
  return (
    <span className={className} style={typography[variant]} {...props}>
      {children}
    </span>
  )
}

export const typography = {
  h1: {
    fontFamily: 'Eina04',
    fontSize: '50px',
    fontWeight: 'bold',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: '1.24',
    letterSpacing: '-0.5px',
  },
  h2: {
    fontFamily: 'Eina04',
    fontSize: '37px',
    fontWeight: 'bold',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: '1.46',
    letterSpacing: '-0.37px',
  },
  h3: {
    fontFamily: 'Eina04',
    fontSize: '28px',
    fontWeight: 'bold',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: '1.5',
    letterSpacing: '-0.28px',
  },
  subtitle1: {
    fontFamily: 'Eina04',
    fontSize: '21px',
    fontWeight: 600,
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: '1.43',
    letterSpacing: '-0.21px',
  },
  inputPlaceholder: {
    fontFamily: 'Eina04',
    fontSize: '14px',
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: '1.11',
    letterSpacing: '-0.3px',
  },
  subtitle2: {
    fontFamily: 'Eina04',
    fontSize: '16px',
    fontWeight: 600,
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: '1.5',
    letterSpacing: '-0.16px',
  },
  nav: {
    fontFamily: 'Eina04',
    fontSize: '16px',
    fontWeight: 600,
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 'normal',
    letterSpacing: 'normal',
  },
  buttonPrimary: {
    fontFamily: 'Eina04',
    fontSize: '16px',
    fontWeight: 600,
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 'normal',
    letterSpacing: '0.18px',
  },
  body1: {
    fontFamily: 'Eina04',
    fontSize: '16px',
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 'normal',
    letterSpacing: 'normal',
  },
  h4: {
    fontFamily: 'Eina04',
    fontSize: '14px',
    fontWeight: 600,
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 'normal',
    letterSpacing: 'normal',
  },
  caption1: {
    fontFamily: 'Eina04',
    fontSize: '14px',
    fontWeight: 600,
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 'normal',
    letterSpacing: 'normal',
  },

  buttonSecondary: {
    fontFamily: 'Eina04',
    fontSize: '14px',
    fontWeight: 600,
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 'normal',
    letterSpacing: '0.16px',
  },

  inputTable: {
    fontFamily: 'Eina04',
    fontSize: '14px',
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: '1.43',
    letterSpacing: '-0.23px',
  },
  body2: {
    fontFamily: 'Eina04',
    fontSize: '14px',
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 'normal',
    letterSpacing: 'normal',
  },
  sidenav: {
    fontFamily: 'Eina04',
    fontSize: '13px',
    fontWeight: 600,
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 'normal',
    letterSpacing: '-0.2px',
  },
  inputLabel: {
    fontFamily: 'Eina04',
    fontSize: '12px',
    fontWeight: 600,
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 'normal',
    letterSpacing: '-0.2px',
  },
  caption2: {
    fontFamily: 'Eina04',
    fontSize: '12px',
    fontWeight: 600,
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: '1.67',
    letterSpacing: '-0.12px',
  },
  caption4: {
    fontFamily: 'Eina04',
    fontSize: '11px',
    fontWeight: 600,
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 'normal',
    letterSpacing: '-0.11px',
  },
  caption3: {
    fontFamily: 'Eina04',
    fontSize: '11px',
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 'normal',
    letterSpacing: '-0.11px',
  },
} as const
