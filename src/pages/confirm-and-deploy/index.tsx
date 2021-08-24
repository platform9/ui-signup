import React, { useEffect } from 'react'
import Container from '../../elements/container'
import Text from '../../elements/text'
import Input from '../../elements/input'
import Button from '../../elements/button'
import Link from '../../elements/link'
import FormValidator from '../../elements/forms'
import { isValidString, isSixDigits, isMatchingValue } from '../../elements/forms/validators'
import managementPlaneIllustration from '../../management-plane.svg'
import { IEmbarkUser, PropsWithContext, withAppContext } from '../../context'
import { ViewPanes } from '../../constants'
import { resendEmbarkVerificationEmail, validateEmbarkVerificationCode } from '../../net/actions'
interface Props {}

const formValidator = new FormValidator<IEmbarkUser>({
  vcode: [
    {
      message: 'Please enter your verification code',
      validator: isValidString,
    },
    {
      message: 'Verification code must be 6 digits',
      validator: isSixDigits,
    },
  ],
  password: [
    {
      message: 'Please enter your password',
      validator: isValidString,
    },
  ],
  confirmPassword: [
    {
      message: 'Please enter your password',
      validator: isValidString,
    },
    {
      message: 'Passwords do not match',
      validator: isMatchingValue('password'),
    },
  ],
})

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
    mounted.current = true
    return () => {
      mounted.current = false
    }
  })
  const [error, setError] = React.useState('')
  const [resendVerifyMessage, setResendVerifyMessage] = React.useState<{
    success: boolean
    message: string
  }>(defaultVerifyState)
  const handleInputChange = (e) => {
    setContextValue({ embarkUser: { ...embarkUser, [e.target.name]: e.target.value } })
  }
  const handleFormSubmit = async (e) => {
    e.preventDefault()
    error && setError('')
    const { foundErrors, hasError } = formValidator.validate(embarkUser)
    setContextValue({ formErrors: foundErrors })
    if (hasError) {
      return false
    }

    const response = await validateEmbarkVerificationCode(user.organizationName, embarkUser)
    if (!response.success) {
      setError(response.data?.message || response.data)
    } else {
      const fqdn = response.data?.fqdn
      window.open(`${fqdn}/ui/pmkft/login`, '_blank')
    }
    return true
  }
  const handleResendVerificationCode = async () => {
    const response = await resendEmbarkVerificationEmail(user.organizationName)
    if (!response.success) {
      setResendVerifyMessage({
        success: false,
        message: response.data?.message || 'Could not resend verification code',
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
    <Container
      rightPanel={<img alt="management-plane" src={managementPlaneIllustration} />}
      previousPane={ViewPanes.CreateUser}
    >
      <form id="uiSignupPagesConfirmAndDeployForm" onSubmit={handleFormSubmit}>
        <Text variant="h3" className="uiSignupElementsTextBlue200">
          You're almost done!
        </Text>
        {error && (
          <Text variant="caption2" className="uiSignupElementsTextRed500">
            {error}
          </Text>
        )}
        <div>
          <Text variant="subtitle2">Enter the verification code we sent to your email:</Text>
          <Input
            accessor={embarkUser}
            name="vcode"
            placeholder="6 Digit Code"
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
            <Link onClick={handleResendVerificationCode}>Resend verification code</Link>
          )}
          <div style={{ height: 18 }} />
          <Text variant="subtitle2">Create a Password</Text>
          <Input
            accessor={embarkUser}
            name="password"
            placeholder="Password"
            type="password"
            onChange={handleInputChange}
            error={formErrors.password}
          />
          <Input
            accessor={embarkUser}
            name="confirmPassword"
            placeholder="Confirm Password"
            type="password"
            onChange={handleInputChange}
            error={formErrors.confirmPassword}
          />
        </div>
        <Button type="submit">Deploy Free Trial Now</Button>
      </form>
    </Container>
  )
}

export default withAppContext<Props>(ConfirmAndDeploy)
