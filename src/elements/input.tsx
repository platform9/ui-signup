import React from 'react'

interface Props
  extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {}

export default function Input(props: Props) {
  return <input id="uiSignupElementsInput" {...props} />
}
