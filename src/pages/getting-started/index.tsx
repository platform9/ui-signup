// Styles
import './style.css'

// Libs
import React, { PropsWithChildren } from 'react'

// Actions
import { navigate } from '../../net/actions'

// App
import { PropsWithContext, withAppContext } from '../../context'
import { ViewPanes, DeployTargets } from '../../constants'
import { SegmentAnalytics } from '../../analytics'

// Elements
import Container from '../../elements/container'
import Text from '../../elements/text'
import CheckBox from '../../elements/check-box'
import Button from '../../elements/button'
import Link from '../../elements/link'
import LogoStrip from './logo-strip'

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
      SegmentAnalytics.track('WZ Sign-up Qualification - 0', {
        import_cluster: deployTarget === DeployTargets.Import,
        build_cluster: deployTarget === DeployTargets.Create,
      })
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
    <>
      <Container>
        <Text variant="h2">
          Kubernetes as a Service on Any Cloud;
          <br />
          Public, Private & Edge
        </Text>
        <footer
          id="uiSignupPagesGettingStartedFooter"
          className={error ? 'uiSignupPagesGettingStartedFooterError' : ''}
        >
          <Text variant="subtitle1" className="uiSignupElementsTextBlue200">
            Are you ready to use Platform9 Managed Kubernetes?
          </Text>
          <div id="uiSignupPagesGettingStartedForm">
            <div className="uiSignupPagesGettingStartedFormSelection">
              <CheckBox
                name={DeployTargets.Import}
                checked={deployTarget === DeployTargets.Import}
                onChange={() => handleChange(DeployTargets.Import)}
                label="I have an existing EKS, AKs or GKE cluser to import."
                className={error ? 'uiSignupError' : ''}
              />
              <CheckBox
                name={DeployTargets.Create}
                checked={deployTarget === DeployTargets.Create}
                onChange={() => handleChange(DeployTargets.Create)}
                label="I have VMs, servers or public cloud to deploy to."
                className={error ? 'uiSignupError' : ''}
              />
            </div>
            <div>
              <Button
                className="uiSignupPagesGettingStartedFooterContinue uiSignupPagesGettingStartedFooterErrorMessage"
                onClick={handleClick}
                container="lg"
                nextArrow
              >
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
      <LogoStrip />
    </>
  )
}

export default withAppContext<Props>(GettingStarted)
