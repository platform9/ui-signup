import React, { PropsWithChildren } from 'react'
import Container from '../elements/container'
import Text from '../elements/text'
import Icon from '../elements/icon'
import CheckBox from '../elements/check-box'
import Button from '../elements/button'
import Link from '../elements/link'
import { PropsWithContext, withAppContext } from '../context'
import { ViewPanes, DeployTargets } from '../constants'

interface Props {}

const calloutItems = [
  'Spin up a Kubernetes cluster in < 5 minutes',
  'Zero to production-ready in minutes',
  'Built-in monitoring with Prometheus & Grafana',
  'Create & manage clusters with Terraform',
  'Automated upgrades and security patching',
  'Connect with popular CI/CD tools',
]

const nextView = ViewPanes.CreateUser

function GettingStarted({
  children,
  deployTarget,
  setContextValue,
}: PropsWithChildren<PropsWithContext<Props>>) {
  const handleClick = () => {
    if (deployTarget) {
      setContextValue({ activePane: nextView })
    }
  }
  return (
    <Container>
      <Text variant="h2">
        Instantly Deploy Open-Source Kubernetes
        <br />
        On Premises, AWS, or Azure
      </Text>
      <div id="uiSignupPagesGettingStartedCallouts">
        {calloutItems.map((item, index) => (
          <div key={index} id="uiSignupPagesGettingStartedCalloutItem">
            <Icon icon="check" size={25} color="Green500" />
            <Text variant="subtitle1">{item}</Text>
          </div>
        ))}
      </div>
      <footer id="uiSignupPagesGettingStartedFooter">
        <Text variant="subtitle1">Are you ready to experience Managed Kubernetes?</Text>
        <div id="uiSignupPagesGettingStartedForm">
          <div>
            <CheckBox
              name={DeployTargets.Import}
              checked={deployTarget === DeployTargets.Import}
              onChange={() => setContextValue({ deployTarget: DeployTargets.Import })}
              label="I have an existing EKS, AKs or GKE cluser to import."
            />
            <CheckBox
              name={DeployTargets.Create}
              checked={deployTarget === DeployTargets.Create}
              onChange={() => setContextValue({ deployTarget: DeployTargets.Create })}
              label="I have VMs, servers or public cloud to deploy to."
            />
          </div>
          <Button onClick={handleClick}>Continue</Button>
        </div>
        <Link onClick={() => setContextValue({ showUnsureModal: true })}>
          Not ready to deploy yet?
        </Link>
      </footer>
      {children}
    </Container>
  )
}

export default withAppContext(GettingStarted)
