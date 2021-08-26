// Libs
import React from 'react'

// Elements
import Icon from '../icon'
import Text from '../text'

export default function InfoTooltip({ message }) {
  return (
    <div className="uiSignupElementsInputInfoIconContainer">
      <Icon icon="info" size={18} className="uiSignupElementsInputInfoIcon" />
      <div className="uiSignupElementsInputInfoTooltip">
        <Text variant="caption2" fixWhitespace={false}>
          {message}
        </Text>
      </div>
    </div>
  )
}
