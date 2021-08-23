import React from 'react'
import { IUser, PropsWithContext, withAppContext } from '../../context'
import Container from '../../elements/container'
import Text from '../../elements/text'
import Link from '../../elements/link'
import managementPlaneIllustration from '../../management-plane.svg'
import Input from '../../elements/input'
import Button from '../../elements/button'
import Icon from '../../elements/icon'
import { ViewPanes } from '../../constants'
import { isValidString, isLowerCase, isValidEmail } from '../../elements/forms/validators'
import FormValidator from '../../elements/forms'
import { navigate } from '../../actions'
import './style.css'

interface Props {}

const formValidator = new FormValidator<IUser>({
  firstName: [
    {
      message: 'Please enter your first name',
      validator: isValidString,
    },
  ],
  lastName: [
    {
      message: 'Please enter your last name',
      validator: isValidString,
    },
  ],
  organizationName: [
    {
      message: 'Please enter your organization name',
      validator: isValidString,
    },
    {
      message: 'Organization name must be lowercase only',
      validator: isLowerCase,
    },
  ],
  organizationEmail: [
    {
      message: 'Please enter your email address',
      validator: isValidString,
    },
    {
      message: 'Please enter a valid email address',
      validator: isValidEmail,
    },
  ],
})

const nextView = ViewPanes.ConfirmAndDeploy
function CreateUser({ setContextValue, user, formErrors, ...props }: PropsWithContext<Props>) {
  const handleInputChange = (e) => {
    setContextValue({ user: { ...user, [e.target.name]: e.target.value } })
  }
  const handleFormSubmit = (e) => {
    e.preventDefault()
    const { foundErrors, hasError } = formValidator.validate(user)
    setContextValue({ formErrors: foundErrors })
    if (hasError) {
      return false
    }

    // TODO make request here if valid and we have a token
    navigate(nextView)
    return true
  }
  return (
    <Container
      rightPanel={<img alt="management-plane" src={managementPlaneIllustration} />}
      previousPane={ViewPanes.GettingStarted}
    >
      <form id="uiSignupPagesCreateUserForm" onSubmit={handleFormSubmit}>
        <Text variant="h3" className="uiSignupElementsTextBlue200">
          Tell us more about yourself
        </Text>
        <div>
          <Input
            accessor={user}
            name="firstName"
            placeholder="First Name"
            onChange={handleInputChange}
            error={formErrors.firstName}
          />
          <Input
            accessor={user}
            name="lastName"
            placeholder="Last Name"
            onChange={handleInputChange}
            error={formErrors.lastName}
          />
          <Input
            accessor={user}
            name="organizationName"
            placeholder="Organization Name"
            onChange={handleInputChange}
            error={formErrors.organizationName}
          />
          <Input
            accessor={user}
            name="organizationEmail"
            placeholder="Organization Email"
            onChange={handleInputChange}
            error={formErrors.organizationEmail}
          />
        </div>
        <Button type="submit">
          Continue <Icon icon="right-arrow" />
        </Button>
      </form>
      <Link onClick={() => setContextValue({ showUnsureModal: true })}>
        Not ready to deploy yet?
      </Link>
    </Container>
  )
}
export default withAppContext<Props>(CreateUser)
