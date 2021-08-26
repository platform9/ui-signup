// App
import { IUser } from '../../context'

// Forms
import { isValidString, isLowerCase, isValidEmail } from '../../elements/forms/validators'
import FormValidator from '../../elements/forms'

export const formValidator = new FormValidator<IUser>({
  firstName: [
    {
      id: 'first-name-empty',
      message: 'Please enter your first name',
      validator: isValidString,
    },
  ],
  lastName: [
    {
      id: 'last-name-empty',
      message: 'Please enter your last name',
      validator: isValidString,
    },
  ],
  organizationName: [
    {
      id: 'organization-name-empty',
      message: 'Please enter your organization name',
      validator: isValidString,
    },
    {
      id: 'organization-name-lowercase',
      message: 'Organization name must be lowercase only',
      validator: isLowerCase,
    },
  ],
  organizationEmail: [
    {
      id: 'organization-email-empty',
      message: 'Please enter your email address',
      validator: isValidString,
    },
    {
      id: 'organization-email-valid',
      message: 'Please enter a valid email address',
      validator: isValidEmail,
    },
  ],
})
