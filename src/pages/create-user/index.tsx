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
import CheckBox from '../../elements/check-box'

interface Props {}

const nextView = ViewPanes.ConfirmAndDeploy
function CreateUser({
  setContextValue,
  user,
  formErrors,
  termsAccepted,
  ...props
}: PropsWithContext<Props>) {
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
  const handleTermsChange = () => {
    setContextValue({ termsAccepted: !termsAccepted })
  }
  const handleInputChange = (e) => {
    setContextValue({ user: { ...user, [e.target.name]: e.target.value } })
  }
  const handleFormSubmit = async (e) => {
    e.preventDefault()
    const { foundErrors, hasError } = formValidator.validate(user)
    if (!termsAccepted) {
      foundErrors.privacyTerms = 'You must accept our Terms and Privacy Policy.'
      SegmentAnalytics.track('WZ Sign-Up TOS Not Checked Error - 1', {
        email: user.organizationEmail,
        firstname: user.firstName,
        lastname: user.lastName,
        account_name: user.organizationName,
        wizard_step: 'Web Sign Up Free Tier Create Account Submission Error',
        wizard_state: 'Error',
        wizard_progress: '1 of 2',
        wizard_name: 'Web Sign Up Free Tier',
      })
    }
    setContextValue({ formErrors: foundErrors })
    if (hasError || !termsAccepted) {
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
    <Container
      rightPanel
      previousPane={ViewPanes.GettingStarted}
      className="uiSignupPagesCreateUserContainer"
    >
      <form id="uiSignupPagesCreateUserForm">
        <div className="uiSignupPagesCreateUserFormTitleContainer">
          <Text variant="h3" className="uiSignupElementsTextBlue200">
            Tell us more about yourself
          </Text>
          {feedbackState.error && (
            <Text variant="caption2" className="uiSignupElementsTextRed500">
              {feedbackState.error}
            </Text>
          )}
        </div>
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
          <CheckBox
            name="terms-privacy"
            checked={!!termsAccepted}
            error={formErrors.privacyTerms}
            onChange={handleTermsChange}
            variant="body2"
            label={[
              'By signing up, I agree to the ',
              <Link href="/terms-conditions/" target="_blank" fixWhitespace={false}>
                Terms of Service
              </Link>,
              ' and ',
              <Link href="/terms-conditions/privacy/" target="_blank" fixWhitespace={false}>
                Privacy Policy
              </Link>,
            ]}
            className={
              formErrors.privacyTerms
                ? 'uiSignupError uiSignupPagesCreateUserFormTOS'
                : 'uiSignupPagesCreateUserFormTOS'
            }
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
