// Styles
import './style.css'

// Libs
import React, { PropsWithChildren } from 'react'

// Actions
import { navigate } from '../../net/actions'

// App
import { managementPlaneURL, ViewPanes } from '../../constants'
import { PropsWithContext, withAppContext } from '../../context'

// Elements
import Icon from '../icon'
import UnsureModal from './unsure-modal'

type Props = PropsWithChildren<{
  rightPanel?: boolean
  previousPane?: ViewPanes
}>

function Container({
  children,
  rightPanel,
  showUnsureModal,
  previousPane,
  setContextValue,
}: PropsWithContext<Props>) {
  return (
    <article
      id="uiSignupElementsContainer"
      className={!!rightPanel ? 'uiSignupElementsContainer-full-width' : undefined}
    >
      {previousPane && (
        <Icon
          icon="left-arrow"
          size={24}
          className="uiSignupElementsContainerBackArrow"
          onClick={() => navigate(previousPane)}
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
  )
}

export default withAppContext<Props>(Container)
