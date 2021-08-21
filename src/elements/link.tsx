import React, { PropsWithChildren } from 'react'
import Text from './text'

interface Props
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  > {}

export default function Link({ children, ...props }: PropsWithChildren<Props>) {
  return (
    <a className="uiSignupElementsLink" {...props}>
      <Text className="uiSignupElementsTextBlue500" variant="body2">
        {children}
      </Text>
    </a>
  )
}
