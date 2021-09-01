// Styles
import './style.css'

// Libs
import React from 'react'

// App
import { PropsWithContext, withAppContext } from '../../context'
import { getElementProps } from '../../helpers'

// Elements
import Text from '../text'
import InfoTooltip from './info-tooltip'

interface Props
  extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  name: string
  accessor: { [key: string]: any }
  label: string
  error?: string
  helpText?: string | JSX.Element
  info?: string
}

function Input({ accessor, label, error, info, helpText, ...props }: PropsWithContext<Props>) {
  const rest = getElementProps(props)
  return (
    <div className="uiSignupElementsInputContainer floating-label-wrap">
      <input
        id={`uiSignupElementsInput${props.name}`}
        className="uiSignupElementsInput uiSignupElementsTextinputPlaceholder floating-label-field"
        value={accessor[props.name]}
        placeholder={label}
        {...rest}
      />
      <label htmlFor="field-1" className="floating-label">
        <Text variant="sidenav" className="" fixWhitespace={false}>
          {label}
        </Text>
      </label>

      {info && <InfoTooltip message={info} />}
      {!helpText && (
        <Text className="uiSignupElementsTextRed500" variant="caption2">
          {error || ''}
          &nbsp;
        </Text>
      )}
      {helpText && (
        <Text className="uiSignupElementsTextGrey000" variant="caption2">
          {helpText || ''}
        </Text>
      )}
    </div>
  )
}

export default withAppContext<Props>(Input)
