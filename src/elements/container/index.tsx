// Styles
import './style.css'

// Libs
import React, { PropsWithChildren } from 'react'

// Actions
import { navigate } from '../../net/actions'

// App
import { managementPlaneURL, ViewPanes } from '../../constants'
import { PropsWithContext, withAppContext } from '../../context'
import { SegmentAnalytics } from '../../analytics'

// Elements
import Icon from '../icon'
import UnsureModal from './unsure-modal'
import Text from '../text'

type Props = PropsWithChildren<{
  className?: string
  rightPanel?: boolean
  previousPane?: ViewPanes
  title?: string
}>

function Container({
  className = '',
  title = 'Get started with Platform9',
  children,
  rightPanel,
  showUnsureModal,
  previousPane,
  setContextValue,
}: PropsWithContext<Props>) {
  const handleBack = () => {
    SegmentAnalytics.track('WZ Sign-up Back', {})
    navigate(previousPane!)
  }
  return (
    <div>
      <Text variant="h3" className="uiSignupAppMainTitle">
        {title}
      </Text>
      <article
        id="uiSignupElementsContainer"
        className={!!rightPanel ? `uiSignupElementsContainer-full-width ${className}` : className}
      >
        {previousPane && (
          <Icon
            icon="left-arrow"
            size={24}
            className="uiSignupElementsContainerBackArrow"
            onClick={handleBack}
          />
        )}
        {showUnsureModal && (
          <UnsureModal onClose={() => setContextValue({ showUnsureModal: false })} />
        )}
        <section>{children}</section>
        {rightPanel && (
          <aside>
            <img alt="management-plane" src={managementPlaneURL} />
          </aside>
        )}
      </article>
    </div>
  )
}

export default withAppContext<Props>(Container)
