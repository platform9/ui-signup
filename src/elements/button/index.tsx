import React, { PropsWithChildren } from 'react'
import './style.css'

interface Props
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {}

export default function Button({ children, className = '', ...props }: PropsWithChildren<Props>) {
  return (
    <button className={`uiSignupElementsButton ${className}`} {...props}>
      <span>{children}</span>
    </button>
  )
}
