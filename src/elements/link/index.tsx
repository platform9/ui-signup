// Styles
import './style.css'

// Libs
import React, { PropsWithChildren } from 'react'

// Elements
import Text, { TextProps } from '../text'

interface Props
  extends React.DetailedHTMLProps<React.AllHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> {
  variant?: TextProps['variant']
  fixWhitespace?: boolean
}

export default function Link({
  children,
  variant = 'body2',
  fixWhitespace,
  ...props
}: PropsWithChildren<Props>) {
  return (
    <a className="uiSignupElementsLink" {...props}>
      <Text className="uiSignupElementsTextBlue500" variant={variant} fixWhitespace={fixWhitespace}>
        {children}
      </Text>
    </a>
  )
}
