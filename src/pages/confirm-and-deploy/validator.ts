// App
import { IEmbarkUser } from '../../context'

// Forms
import FormValidator from '../../elements/forms'
import {
  isValidString,
  hasMinLength,
  isMatchingValue,
  hasLowercaseLetter,
  hasUppercaseLetter,
  hasSpecialCharacter,
} from '../../elements/forms/validators'

export const formValidator = new FormValidator<IEmbarkUser>({
  vcode: [
    {
      id: 'vcode-empty',
      message: 'Please enter your verification code',
      validator: isValidString,
    },
    {
      id: 'vcode-length',
      message: 'Verification code must be 6 digits',
      validator: hasMinLength(6, true),
    },
  ],
  password: [
    {
      id: 'password-empty',
      message: 'Please enter your password',
      validator: isValidString,
    },
    {
      id: 'password-length',
      message: 'Password must be at least 8 characters',
      validator: hasMinLength(8),
    },
    {
      id: 'password-lowercase',
      message: '1 lowercase letter required',
      validator: hasLowercaseLetter,
    },
    {
      id: 'password-uppercase',
      message: '1 uppercase letter required',
      validator: hasUppercaseLetter,
    },
    {
      id: 'password-special-character',
      message: '1 special character required',
      validator: hasSpecialCharacter,
    },
  ],
  confirmPassword: [
    {
      id: 'confirm-password-empty',
      message: 'Please confirm your password',
      validator: isValidString,
    },
    {
      id: 'confirm-password-match',
      message: 'Passwords do not match',
      validator: isMatchingValue('password'),
    },
  ],
})
