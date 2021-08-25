import React from 'react'
import { PropsWithContext, withAppContext } from '../../context'
import { getElementProps } from '../../helpers'
import Icon from '../icon'
import Text, { typography } from '../text'
import './style.css'

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
        className="uiSignupElementsInput floating-label-field"
        value={accessor[props.name]}
        style={{ ...typography.inputPlaceholder }}
        placeholder={label}
        {...rest}
      />
      <label htmlFor="field-1" className="floating-label">
        <Text variant="sidenav" className="" fixWhitespace={false}>
          {label}
        </Text>
      </label>

      {info && <InfoTooltip message={info} />}
      <Text className="uiSignupElementsTextRed500" variant="caption2">
        {error || ''}&nbsp;
      </Text>
      {helpText && (
        <Text className="uiSignupElementsTextGrey000" variant="caption2">
          {helpText || ''}
        </Text>
      )}
    </div>
  )
}

const InfoTooltip = ({ message }) => {
  return (
    <div className="uiSignupElementsInputInfoIconContainer">
      <Icon icon="info" size={18} className="uiSignupElementsInputInfoIcon" />
      <div className="uiSignupElementsInputInfoTooltip">
        <Text variant="caption3" fixWhitespace={false}>
          {message}
        </Text>
      </div>
    </div>
  )
}

export default withAppContext<Props>(Input)
