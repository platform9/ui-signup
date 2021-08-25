import React from 'react'
import Icon from '../icon'
import Text from '../text'
import './style.css'

interface Props
  extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  name: string
  label: string
  onChange: () => void
}

export default function CheckBox({ label, name, ...props }: Props) {
  const id = `uiSignupElementsCheckBox_${name}`
  return (
    <div className="uiSignupElementsCheckBox">
      <input id={id} type="checkbox" {...props} />
      <div className="uiSignupElementsCheckBoxAdornment" onClick={() => props.onChange()}>
        {props.checked && <Icon icon="done" size={14} />}
      </div>
      <label htmlFor={id}>
        <Text>{label}</Text>
      </label>
    </div>
  )
}
