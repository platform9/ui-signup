import React from 'react'
import { IUser, PropsWithContext, withAppContext } from '../../context'
import Container from '../../elements/container'
import Text from '../../elements/text'
import Link from '../../elements/link'
import Input from '../../elements/input'
import Button from '../../elements/button'
import { ViewPanes } from '../../constants'
import { isValidString, isLowerCase, isValidEmail } from '../../elements/forms/validators'
import FormValidator from '../../elements/forms'
import { createEmbarkUser, navigate } from '../../net/actions'
import './style.css'

interface Props {}

const formValidator = new FormValidator<IUser>({
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

const nextView = ViewPanes.ConfirmAndDeploy
function CreateUser({ setContextValue, user, formErrors, ...props }: PropsWithContext<Props>) {
  const [feedbackState, setFeedbackState] = React.useState({
    error: '',
    working: false,
  })
  const handleInputChange = (e) => {
    setContextValue({ user: { ...user, [e.target.name]: e.target.value } })
  }
  const handleFormSubmit = async (e) => {
    e.preventDefault()
    const { foundErrors, hasError } = formValidator.validate(user)
    setContextValue({ formErrors: foundErrors })
    if (hasError) {
      return false
    }

    setFeedbackState({ error: '', working: true })
    const response = await createEmbarkUser(user)
    if (response.success) {
      navigate(nextView)
    } else {
      setFeedbackState({ error: response.data?.message || response.data, working: false })
    }
    return true
  }
  return (
    <Container
      rightPanel={
        <img
          alt="management-plane"
          src="https://platformninesg.wpengine.com/wp-content/uploads/2021/08/management-plane.svg"
        />
      }
      previousPane={ViewPanes.GettingStarted}
    >
      <form id="uiSignupPagesCreateUserForm">
        <Text variant="h3" className="uiSignupElementsTextBlue200">
          Tell us more about yourself
        </Text>
        {feedbackState.error && (
          <Text variant="caption2" className="uiSignupElementsTextRed500">
            {feedbackState.error}
          </Text>
        )}
        <div>
          <Input
            accessor={user}
            name="firstName"
            label="First Name"
            onChange={handleInputChange}
            error={formErrors.firstName}
          />
          <Input
            accessor={user}
            name="lastName"
            label="Last Name"
            onChange={handleInputChange}
            error={formErrors.lastName}
          />
          <Input
            accessor={user}
            name="organizationName"
            label="Organization Name"
            onChange={handleInputChange}
            error={formErrors.organizationName}
            info="The unique name used to identify your Platform9 Instance. Must be lowercase only."
          />
          <Input
            accessor={user}
            name="organizationEmail"
            label="Organization Email"
            onChange={handleInputChange}
            error={formErrors.organizationEmail}
            info="Your work email to use as your account login."
          />
        </div>
        <Button onClick={handleFormSubmit} nextArrow disabled={feedbackState.working}>
          Continue
        </Button>
      </form>
      <Link onClick={() => setContextValue({ showUnsureModal: true })}>
        Not ready to deploy yet?
      </Link>
    </Container>
  )
}
export default withAppContext<Props>(CreateUser)
