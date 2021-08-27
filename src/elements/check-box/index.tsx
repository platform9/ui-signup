// Styles
import './style.css'

// Libs
import React from 'react'

// Elements
import Icon from '../icon'
import Text, { TextProps } from '../text'

interface Props
  extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  name: string
  label: string | Array<string | JSX.Element>
  error?: string
  variant?: TextProps['variant']
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function CheckBox({
  label,
  name,
  className,
  error,
  variant = 'body1',
  ...props
}: Props) {
  const id = `uiSignupElementsCheckBox_${name}`
  return (
    <div className={`uiSignupElementsCheckBox ${className}`}>
      <input id={id} type="checkbox" {...props} />
      <div className="uiSignupElementsCheckBoxAdornment" onClick={(e: any) => props.onChange(e)}>
        {props.checked && <Icon icon="done" size={14} />}
      </div>
      <label htmlFor={id}>
        <Text
          variant={variant}
          className="uiSignupElementsTextGrey000 uiSignupElementsCheckBoxLabelMessage"
        >
          {label}
        </Text>
      </label>
      {error && (
        <Text
          className="uiSignupElementsTextRed500 uiSignupElementsCheckBoxError"
          variant="caption2"
        >
          {error}
        </Text>
      )}
    </div>
  )
}
