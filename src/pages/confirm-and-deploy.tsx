import React from 'react'
import Container from '../elements/container'
import Text from '../elements/text'
import Input from '../elements/input'
import Button from '../elements/button'
import Link from '../elements/link'
import FormValidator from '../elements/forms'
import { isValidString, isSixDigits, isMatchingValue } from '../elements/forms/validators'
import managementPlaneIllustration from '../management-plane.svg'
import { IEmbarkUser, PropsWithContext, withAppContext } from '../context'
interface Props { }

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

function ConfirmAndDeploy({ setContextValue, embarkUser, formErrors, ...props }: PropsWithContext<Props>) {
  const handleInputChange = (e) => {
    setContextValue({ embarkUser: { ...embarkUser, [e.target.name]: e.target.value } })
  }
  const handleFormSubmit = (e) => {
    e.preventDefault()
    const { foundErrors, hasError } = formValidator.validate(embarkUser)
    setContextValue({ formErrors: foundErrors })
    if (hasError) {
      return false
    }

    // TODO make request here if valid and we have a token
    return true
  }
  const handleResendVerificationCode = () => {

  }
  return (
    <Container rightPanel={<img alt="management-plane" src={managementPlaneIllustration} />}>
      <form id="uiSignupPagesConfirmAndDeployForm" onSubmit={handleFormSubmit}>
        <Text variant="h3" className="uiSignupElementsTextBlue200">
          You're almost done!
        </Text>
        <div>
          <Text variant="subtitle2">
            Enter the verification code we sent to your email:
          </Text>
          <Input
            accessor={embarkUser}
            name="vcode"
            placeholder="6 Digit Code"
            onChange={handleInputChange}
            error={formErrors.vcode}
          />
          <Link onClick={handleResendVerificationCode}>
            Resend verification code
          </Link>
          <div style={{ height: 18 }} />
          <Text variant="subtitle2">
            Create a Password
          </Text>
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
        <Button type="submit">
          Deploy Free Trial Now
        </Button>
      </form>
    </Container>
  )
}

export default withAppContext<Props>(ConfirmAndDeploy)
