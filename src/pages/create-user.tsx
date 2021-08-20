import React from 'react'
import { PropsWithContext, withAppContext } from '../context'
import Container from '../elements/container'
import Text from '../elements/text'
import Link from '../elements/link'
import managementPlaneIllustration from '../management-plane.svg'
import Input from '../elements/input'
import Button from '../elements/button'
import Icon from '../elements/icon'
import { ViewPanes } from '../constants'

interface Props {}
const nextView = ViewPanes.ConfirmAndDeploy
function CreateUser({ setContextValue, user, ...props }: PropsWithContext<Props>) {
  const handleClick = () => {
    setContextValue({ activePane: nextView })
  }
  const handleInputChange = (e) => {
    setContextValue({ user: { ...user, [e.target.name]: e.target.value } })
  }
  return (
    <Container rightPanel={<img alt="management-plane" src={managementPlaneIllustration} />}>
      <Text variant="h3" id="uiSignupElementsTextBlue200">
        Tell us more about yourself
      </Text>
      <Input name="firstName" placeholder="First Name" onChange={handleInputChange} />
      <Input name="lastName" placeholder="Last Name" onChange={handleInputChange} />
      <Input name="organizationName" placeholder="Organization Name" onChange={handleInputChange} />
      <Input
        name="organizationEmail"
        placeholder="Organization Email"
        onChange={handleInputChange}
      />
      <Button onClick={handleClick}>
        Continue <Icon icon="arrow-right" />
      </Button>
      <Link onClick={() => setContextValue({ showUnsureModal: true })}>
        Not ready to deploy yet?
      </Link>
    </Container>
  )
}
export default withAppContext<Props>(CreateUser)
