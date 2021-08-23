import React from 'react'
import Text from './text'

interface Props
  extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  name: string
  label: string
}

export default function CheckBox({ label, name, ...props }: Props) {
  const id = `uiSignupElementsCheckBox_${name}`
  return (
    <div className="uiSignupElementsCheckBox">
      <input id={id} type="checkbox" {...props} />
      <label htmlFor={id}>
        <Text>{label}</Text>
      </label>
    </div>
  )
}
