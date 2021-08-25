import React from 'react'
import FormValidator from '../../elements/forms'
import Icon from '../../elements/icon'
import Text from '../../elements/text'

interface Props<T> {
  target: string
  validator: FormValidator<T>
  formValues: { [key: string]: any }
}

export enum PasswordValidatorHelpFields {
  PasswordEmpty = 'password-empty',
  PasswordLength = 'password-length',
  PasswordLowercase = 'password-lowercase',
  PasswordUppercase = 'password-uppercase',
  PasswordSpecialCharacter = 'password-special-character',
}

// \f00c
export default function PasswordValidatorHelp<T>({ target, validator, formValues }: Props<T>) {
  const foundErrors = validator.validateField(target, formValues, false)
  const isEmpty = !!foundErrors[PasswordValidatorHelpFields.PasswordEmpty]
  debugger
  return (
    <div className="uiSignupPagesConfirmAndDeployPasswordValidatorHelp">
      <PasswordCheck
        isValid={!isEmpty && !foundErrors[PasswordValidatorHelpFields.PasswordLength]}
        value="At least 8 characters"
      />
      <PasswordCheck
        isValid={!isEmpty && !foundErrors[PasswordValidatorHelpFields.PasswordLowercase]}
        value="1 lowercase letter"
      />
      <PasswordCheck
        isValid={!isEmpty && !foundErrors[PasswordValidatorHelpFields.PasswordUppercase]}
        value="1 uppercase letter"
      />
      <PasswordCheck
        isValid={!isEmpty && !foundErrors[PasswordValidatorHelpFields.PasswordSpecialCharacter]}
        value="1 special character"
      />
    </div>
  )
}

const PasswordCheck = ({ isValid, value }) => {
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
