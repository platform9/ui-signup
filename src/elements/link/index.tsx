import React, { PropsWithChildren } from 'react'
import Text, { TextProps } from '../text'
import './style.css'

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
