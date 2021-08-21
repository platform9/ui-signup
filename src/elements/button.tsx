import React, { PropsWithChildren } from 'react'

interface Props
  extends React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
  > { }

export default function Button({ children, className, ...props }: PropsWithChildren<Props>) {
  const classes = className ? `uiSignupElementsButton ${className}` : 'uiSignupElementsButton'
  return (
    <button className={classes} {...props}>
      <span>{children}</span>
    </button>
  )
}
