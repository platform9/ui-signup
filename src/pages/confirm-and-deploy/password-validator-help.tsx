// Libs
import React from 'react'

// Elements
import Icon from '../../elements/icon'
import Text from '../../elements/text'

// Validator
import { formValidator } from './validator'

interface Props {
  target: string
  formValues: { [key: string]: any }
}

export enum PasswordValidatorHelpFields {
  PasswordEmpty = 'password-empty',
  PasswordLength = 'password-length',
  PasswordLowercase = 'password-lowercase',
  PasswordUppercase = 'password-uppercase',
  PasswordSpecialCharacter = 'password-special-character',
}

export default function PasswordValidatorHelp({ target, formValues }: Props) {
  const foundErrors = formValidator.validateField(target, formValues, false)
  const isEmpty = !!foundErrors[PasswordValidatorHelpFields.PasswordEmpty]
  debugger
  return (
    <div className="uiSignupPagesConfirmAndDeployPasswordValidatorHelp">
      <PasswordFieldValidator
        isValid={!isEmpty && !foundErrors[PasswordValidatorHelpFields.PasswordLength]}
        value="At least 8 characters"
      />
      <PasswordFieldValidator
        isValid={!isEmpty && !foundErrors[PasswordValidatorHelpFields.PasswordLowercase]}
        value="1 lowercase letter"
      />
      <PasswordFieldValidator
        isValid={!isEmpty && !foundErrors[PasswordValidatorHelpFields.PasswordUppercase]}
        value="1 uppercase letter"
      />
      <PasswordFieldValidator
        isValid={!isEmpty && !foundErrors[PasswordValidatorHelpFields.PasswordSpecialCharacter]}
        value="1 special character"
      />
    </div>
  )
}

const PasswordFieldValidator = ({ isValid, value }) => {
  return (
    <Text
      variant="caption3"
      className="uiSignupElementsTextGrey200 uiSignupPagesConfirmAndDeployPasswordValidatorCheckContainer"
    >
      <span className="uiSignupPagesConfirmAndDeployPasswordValidatorCheck">
        {isValid ? <Icon icon="done" size={12} /> : '•'}
      </span>
      {value}
    </Text>
  )
}
