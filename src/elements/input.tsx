import React from 'react'
import { PropsWithContext, withAppContext } from '../context'
import { getElementProps } from '../helpers'
import Text, { typography } from './text'

interface Props
  extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  name: string
  accessor: {[key: string]: any}
  error?: string
}

function Input({accessor, error, ...props}: PropsWithContext<Props>) {
  const rest = getElementProps(props)
  return (
    <div className="uiSignupElementsInputContainer">
      <input
      id={`uiSignupElementsInput${props.name}`}
      className="uiSignupElementsInput"
      value={accessor[props.name]}
      style={{ ...typography.inputPlaceholder }}
      {...rest}
    />
    <Text className="uiSignupElementsTextRed500" variant="caption2">{error || ''}&nbsp;</Text>
    </div>
  )
}

export default withAppContext<Props>(Input)
