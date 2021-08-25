import React, { PropsWithChildren } from 'react'
import Container from '../../elements/container'
import Text from '../../elements/text'
import CheckBox from '../../elements/check-box'
import Button from '../../elements/button'
import Link from '../../elements/link'
import { PropsWithContext, withAppContext } from '../../context'
import { ViewPanes, DeployTargets } from '../../constants'
import './style.css'
import { navigate } from '../../net/actions'

type Props = PropsWithChildren<{}>

const calloutItems = [
  'Spin up a Kubernetes cluster in < 5 minutes',
  'Zero to production-ready in minutes',
  'Built-in monitoring with Prometheus & Grafana',
  'Create & manage clusters with Terraform',
  'Automated upgrades and security patching',
  'Connect with popular CI/CD tools',
]

const nextView = ViewPanes.CreateUser

function GettingStarted({ children, deployTarget, setContextValue }: PropsWithContext<Props>) {
  const [error, setError] = React.useState(false)
  const handleClick = () => {
    if (deployTarget) {
      navigate(nextView)
    } else {
      setError(true)
    }
  }
  const handleChange = (newDeployTarget) => {
    if (error) setError(false)
    setContextValue({
      deployTarget: deployTarget === newDeployTarget ? undefined : newDeployTarget,
    })
  }
  return (
    <Container>
      <Text variant="h2">
        Instantly Deploy Open-Source Kubernetes
        <br />
        On Premises, AWS, or Azure
      </Text>
      <footer
        id="uiSignupPagesGettingStartedFooter"
        className={error ? 'uiSignupPagesGettingStartedFooterError' : ''}
      >
        <Text variant="subtitle1" className="uiSignupElementsTextBlue200">
          Are you ready to experience Managed Kubernetes?
        </Text>
        <div id="uiSignupPagesGettingStartedForm">
          <div>
            <CheckBox
              name={DeployTargets.Import}
              checked={deployTarget === DeployTargets.Import}
              onChange={() => handleChange(DeployTargets.Import)}
              label="I have an existing EKS, AKs or GKE cluser to import."
            />
            <CheckBox
              name={DeployTargets.Create}
              checked={deployTarget === DeployTargets.Create}
              onChange={() => handleChange(DeployTargets.Create)}
              label="I have VMs, servers or public cloud to deploy to."
            />
          </div>
          <div>
            <Button className="uiSignupPagesGettingStartedFooterErrorMessage" onClick={handleClick}>
              Continue
            </Button>
            <Text
              variant="caption2"
              className="uiSignupPagesGettingStartedFooterErrorMessage uiSignupElementsTextRed500"
            >
              {error ? 'Please choose an option' : ''}
              &nbsp;
            </Text>
          </div>
        </div>
        <Link onClick={() => setContextValue({ showUnsureModal: true })}>
          Not ready to deploy yet?
        </Link>
      </footer>
      <ul id="uiSignupPagesGettingStartedCallouts">
        {calloutItems.map((item, index) => (
          <li key={index} id="uiSignupPagesGettingStartedCalloutItem">
            <Text variant="subtitle1">{item}</Text>
          </li>
        ))}
      </ul>
      {children}
    </Container>
  )
}

export default withAppContext<Props>(GettingStarted)
