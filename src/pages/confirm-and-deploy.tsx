import React, { PropsWithChildren } from 'react'
import Container from '../elements/container'
import managementPlaneIllustration from '../management-plane.svg'
interface Props {}

export default function ConfirmAndDeploy({ children, ...props }: PropsWithChildren<Props>) {
  return (
    <Container rightPanel={<img alt="management-plane" src={managementPlaneIllustration} />}>
      {children}
    </Container>
  )
}
