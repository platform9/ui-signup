// Styles
import './style.css'

// Libs
import React, { useEffect } from 'react'

// Actions
import { createEmbarkUser, navigate } from '../../net/actions'

// App
import { PropsWithContext, withAppContext } from '../../context'
import { ViewPanes } from '../../constants'
import { SegmentAnalytics } from '../../analytics'

// Elements
import Container from '../../elements/container'
import Text from '../../elements/text'
import Link from '../../elements/link'
import Input from '../../elements/input'
import Button from '../../elements/button'

// Validator
import { formValidator } from './validator'

interface Props {}

const nextView = ViewPanes.ConfirmAndDeploy
function CreateUser({ setContextValue, user, formErrors, ...props }: PropsWithContext<Props>) {
  useEffect(() => {
    SegmentAnalytics.page('PMKFT Sign Up Page', {
      section: 'Launch Service',
      topic: 'Create Account',
    })
  }, [])
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
      setFeedbackState({ error: '', working: false })
      return false
    }

    setFeedbackState({ error: '', working: true })
    const response = await createEmbarkUser(user)
    if (response.success) {
      navigate(nextView)
    } else {
      setFeedbackState({
        error: response.error?.message || 'Sorry, your signup failed. Contact signup@platform9.com',
        working: false,
      })
    }
    return true
  }
  return (
    <Container className="uiSignupPagesCreateUserContainer">
      <div className="uiSignupPagesCreateUserFormTitleContainer">
        <Text variant="h3" className="uiSignupElementsTextBlue200">
          Get Started for Free
        </Text>
        {feedbackState.error && (
          <Text variant="caption2" className="uiSignupElementsTextRed500">
            {feedbackState.error}
          </Text>
        )}
      </div>
      <form id="uiSignupPagesCreateUserForm">
        <div>
          <div className="uiSignupPagesCreateUserFormNameFields">
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
          </div>
          <Input
            accessor={user}
            name="organizationName"
            label="Platform9 Account Name"
            onChange={handleInputChange}
            error={formErrors.organizationName}
            info="The unique name used to identify your Platform9 Instance. Must be lowercase only."
          />
          <Input
            accessor={user}
            name="organizationEmail"
            label="Account Email"
            onChange={handleInputChange}
            error={formErrors.organizationEmail}
            info="Your work email to use as your account login."
          />
        </div>
        <Button onClick={handleFormSubmit} icon="right-arrow" disabled={feedbackState.working}>
          Continue
        </Button>
      </form>
      <Text variant="body2">
        By signing up, I agree to Platform9's{' '}
        <Link href="/terms-conditions/" target="_blank" fixWhitespace={false}>
          Terms of Service
        </Link>{' '}
        and{' '}
        <Link href="/terms-conditions/privacy/" target="_blank" fixWhitespace={false}>
          Privacy Policy
        </Link>
        .
      </Text>
    </Container>
  )
}
export default withAppContext<Props>(CreateUser)
