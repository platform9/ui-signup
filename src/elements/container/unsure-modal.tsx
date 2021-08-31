// Libs
import React from 'react'

// App
import { SegmentAnalytics } from '../../analytics'
import { signupDemoURL } from '../../constants'

// Elements
import Button from '../button'
import Text from '../text'

export default function UnsureModal({ onClose }) {
  const handleViewLiveDemo = () => {
    SegmentAnalytics.track('WZ Sign-up Launched Live Demo', {})
  }
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
          <Button onClick={onClose} variant="secondary">
            Explore Later
          </Button>
          <Button onClick={handleViewLiveDemo} href={signupDemoURL} target="_blank">
            View Platform9 Demo
          </Button>
        </footer>
      </div>
    </div>
  )
}
