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
function CreateUser({ setContextValue, ...props }: PropsWithContext<Props>) {
  const handleClick = () => {
    setContextValue({ activePane: nextView })
  }
  return (
    <Container rightPanel={<img alt="management-plane" src={managementPlaneIllustration} />}>
      <Text variant="h3" id="uiSignupElementsTextBlue200">
        Tell us more about yourself
      </Text>
      <Input placeholder="First Name" />
      <Input placeholder="Last Name" />
      <Input placeholder="Organization Name" />
      <Input placeholder="Organization Email" />
      <Button onClick={handleClick}>
        Continue <Icon icon="arrow-right" />
      </Button>
      <Link onClick={() => setContextValue({ showUnsureModal: true })}>
        Not ready to deploy yet?
      </Link>
    </Container>
  )
}
export default withAppContext(CreateUser)
