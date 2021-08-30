// Styles
import './style.css'

// Libs
import React, { useEffect } from 'react'

// Actions
import {
  resendEmbarkVerificationEmail,
  validateEmbarkVerificationCode,
  authenticateUser,
} from '../../net/actions'

// App
import { PropsWithContext, withAppContext } from '../../context'
import { SegmentAnalytics } from '../../analytics'
import { clearState } from '../../helpers'

// Elements
import Button from '../../elements/button'
import Container from '../../elements/container'
import Input from '../../elements/input'
import Link from '../../elements/link'
import Text from '../../elements/text'
import PasswordValidatorHelp from './password-validator-help'

// Validator
import { formValidator } from './validator'

interface Props {}

const defaultVerifyState = null as any

function ConfirmAndDeploy({
  setContextValue,
  embarkUser,
  user,
  formErrors,
  ...props
}: PropsWithContext<Props>) {
  const mounted = React.useRef(false)
  useEffect(() => {
    SegmentAnalytics.page('PMKFT Verification Code Page', {
      section: 'Launch Service',
      topic: 'Verification Code',
    })
    mounted.current = true
    return () => {
      mounted.current = false
    }
  }, [])
  const [feedbackState, setFeedbackState] = React.useState({
    error: '',
    working: false,
  })
  const [resendVerifyMessage, setResendVerifyMessage] = React.useState<{
    success: boolean
    message: string
  }>(defaultVerifyState)
  const handleInputChange = (e) => {
    setContextValue({ embarkUser: { ...embarkUser, [e.target.name]: e.target.value } })
  }
  const handleFormSubmit = async (e) => {
    e.preventDefault()
    const { foundErrors, hasError } = formValidator.validate(embarkUser)
    setContextValue({ formErrors: foundErrors })
    if (hasError) {
      return false
    }

    setFeedbackState({ error: '', working: true })
    const validateResponse = await validateEmbarkVerificationCode(user.organizationName, embarkUser)
    if (!validateResponse.success) {
      setFeedbackState({
        error: validateResponse.error?.message || 'Unable to verify your account',
        working: false,
      })
    } else {
      const fqdn = validateResponse.data?.region_url
      const authenticatedResponse = await authenticateUser(user.organizationName, {
        fqdn,
        email: user.organizationEmail,
        password: embarkUser.password,
        vcode: embarkUser.vcode,
      })
      if (!authenticatedResponse.success) {
        setFeedbackState({
          error:
            authenticatedResponse.error?.message ||
            'Login failed. Please contact support@platform9.com for assistance.',
          working: false,
        })
        clearState()
        return authenticatedResponse
      }
    }
    return true
  }
  const handleResendVerificationCode = async () => {
    const response = await resendEmbarkVerificationEmail(user.organizationName)
    if (!response.success) {
      setResendVerifyMessage({
        success: false,
        message: response.error?.message || 'Could not resend verification code',
      })
    } else {
      setResendVerifyMessage({
        success: true,
        message: 'Verification code sent',
      })
    }
    setTimeout(() => {
      if (mounted.current) {
        setResendVerifyMessage(defaultVerifyState)
      }
    }, 5000)
  }
  return (
    <Container rightPanel>
      <form id="uiSignupPagesConfirmAndDeployForm">
        <Text variant="h3" className="uiSignupElementsTextBlue200">
          You're almost done!
        </Text>
        {feedbackState.error && (
          <Text variant="caption2" className="uiSignupElementsTextRed500">
            {feedbackState.error}
          </Text>
        )}
        <div>
          <Text variant="subtitle2">Enter the verification code we sent to your email:</Text>
          <Input
            accessor={embarkUser}
            name="vcode"
            label="6 Digit Code"
            onChange={handleInputChange}
            error={formErrors.vcode}
          />
          {!!resendVerifyMessage ? (
            <Text
              variant="caption1"
              className={`uiSignupElementsText${
                resendVerifyMessage.success ? 'Green500' : 'Red500'
              }`}
            >
              {resendVerifyMessage.message}
            </Text>
          ) : (
            <Link onClick={handleResendVerificationCode} variant="caption1">
              Resend verification code
            </Link>
          )}
          <div style={{ height: 18 }} />
          <Text variant="subtitle2">Create a Password</Text>
          <Input
            accessor={embarkUser}
            name="password"
            label="Password"
            type="password"
            onChange={handleInputChange}
            error={formErrors.password || formErrors.confirmPassword}
          />
          <Input
            accessor={embarkUser}
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            onChange={handleInputChange}
            helpText={<PasswordValidatorHelp formValues={embarkUser} target="password" />}
          />
        </div>
        <Button onClick={handleFormSubmit} disabled={feedbackState.working}>
          Deploy Free Trial Now
        </Button>
      </form>
    </Container>
  )
}

export default withAppContext<Props>(ConfirmAndDeploy)
