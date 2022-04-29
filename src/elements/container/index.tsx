// Styles
import './style.css'

// Libs
import React, { PropsWithChildren } from 'react'

// Actions
import { navigate } from '../../net/actions'

// App
import { ViewPanes } from '../../constants'
import { PropsWithContext, withAppContext } from '../../context'
import { SegmentAnalytics } from '../../analytics'

// Elements
import Icon from '../icon'
import Text from '../text'

type Props = PropsWithChildren<{
  className?: string
  rightPanel?: boolean
  previousPane?: ViewPanes
  title?: string
}>

const calloutItems = [
  'Dedicated Platform9 SaaS Instance to build, scale and operate Kubernetes',
  'Run on-prem with bare metal or VMs. Build in AWS and Azure, or import clusters from EKS, AKS and GKE',
  'Increase developer productivity via real-time workload dashboards with pod status, container logs, K8s events and more',
  'Consume ArgoCD-as-a-service for zero-setup continuous delivery to any cluster; just attach your git repo',
  '2 clusters with up to 8 nodes - free forever',
]

function Container({
  className = '',
  children,
  rightPanel = true,
  previousPane,
  setContextValue,
}: PropsWithContext<Props>) {
  const handleBack = () => {
    SegmentAnalytics.track('WZ Sign-up Back', {})
    navigate(previousPane!)
  }
  return (
    <article
      id="uiSignupElementsContainer"
      className={!!rightPanel ? `uiSignupElementsContainer-full-width ${className}` : className}
    >
      <section>
        <Text variant="h2" className="uiSignupElementsTextGrey000 uiSignupElementsContainerTitle">
        A better way to go Cloud Native
          <br />
          Kubernetes with ArgoCD
        </Text>
        <ul id="uiSignupElementsContainerCallouts">
          {calloutItems.map((item, index) => (
            <li key={index} id="uiSignupElementsContainerCalloutItem">
              <Icon icon="done" color="#0edf79" size={18} />
              <Text variant="body-large">{item}</Text>
            </li>
          ))}
        </ul>
      </section>
      <aside>
        {previousPane && (
          <Icon
            icon="left-arrow"
            size={24}
            className="uiSignupElementsContainerBackArrow"
            onClick={handleBack}
          />
        )}
        {children}
      </aside>
    </article>
  )
}

export default withAppContext<Props>(Container)
