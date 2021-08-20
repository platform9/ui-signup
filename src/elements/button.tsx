import React, { PropsWithChildren } from 'react'

interface Props
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {}

export default function Button({ children, ...props }: PropsWithChildren<Props>) {
  return (
    <button id="uiSignupElementsButton" {...props}>
      <span>{children}</span>
    </button>
  )
}
