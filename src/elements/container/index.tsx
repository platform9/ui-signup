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
  '2 clusters, 8 nodes - free forever',
  'Build clusters on bare metal, VMs, or public clouds',
  'Import existing clusters from EKS, AKS, GKE',
  'Provide any user with instant access to view, deploy and troubleshoot your apps',
  'Centerally manage Kubernetes environments, upgrades, RBAC and more',
]

function Container({
  className = '',
  title = 'Managed Kubernetes Anywhere - Fast & Easy.',
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
        <Text variant="h2">{title}</Text>
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
