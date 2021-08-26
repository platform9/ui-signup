// Styles
import './style.css'

// Libs
import React, { PropsWithChildren } from 'react'

// Elements
import Text, { TextProps } from '../text'

interface Props
  extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> {
  variant?: TextProps['variant']
}

export default function Link({ children, variant = 'body2', ...props }: PropsWithChildren<Props>) {
  return (
    <a className="uiSignupElementsLink" {...props}>
      <Text className="uiSignupElementsTextBlue500" variant={variant}>
        {children}
      </Text>
    </a>
  )
}
