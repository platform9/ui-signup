// Styles
import './style.css'

// Libs
import React, { PropsWithChildren } from 'react'

// Elements
import Text, { TextProps } from '../text'

interface Props
  extends React.DetailedHTMLProps<React.AllHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> {
  variant?: TextProps['variant']
  textClassName?: string
  fixWhitespace?: boolean
}

export default function Link({
  children,
  variant = 'body2',
  fixWhitespace,
  textClassName = 'uiSignupElementsTextBlue500',
  ...props
}: PropsWithChildren<Props>) {
  return (
    <a className="uiSignupElementsLink" {...props}>
      <Text className={textClassName} variant={variant} fixWhitespace={fixWhitespace}>
        {children}
      </Text>
    </a>
  )
}
