import React, { PropsWithChildren } from 'react'
import { PropsWithContext, withAppContext } from '../context'
import Button from './button'
import Text from './text'

interface Props {
  rightPanel?: React.ReactNode
}

function Container({
  children,
  rightPanel,
  showUnsureModal,
  setContextValue,
}: PropsWithChildren<PropsWithContext<Props>>) {
  return (
    <article
      id="uiSignupElementsContainer"
      className={!!rightPanel ? 'uiSignupElementsContainer-full-width' : undefined}
    >
      {showUnsureModal && (
        <UnsureModal onClose={() => setContextValue({ showUnsureModal: false })} />
      )}
      <section>{children}</section>
      {rightPanel && <aside>{rightPanel}</aside>}
    </article>
  )
}

function UnsureModal({ onClose }) {
  return (
    <div id="uiSignupElementsContainerUnsureModal">
      <div id="uiSignupElementsContainerUnsureModalBackdrop" />
      <div id="uiSignupElementsContainerUnsureModalContent">
        <Text variant="subtitle1">Not ready to deploy?</Text>
        <Text>
          If you are not quite ready to deploy your customized product, you can play with a live
          demo now.
        </Text>
        <footer>
          <Button onClick={onClose}>Explore Later</Button>
          <Button>Go To Live Demo</Button>
        </footer>
      </div>
    </div>
  )
}

export default withAppContext(Container)
