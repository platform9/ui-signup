import React from 'react'
import Text from '../../elements/text'

export default function LogoStrip() {
  return (
    <div className="uiSignupPagesGettingStartedLogoStripContainer">
      <Text variant="subtitle2" className="uiSignupElementsTextBlue200">
        Join the Ranks of Modern Platform Teams
      </Text>
      <div className="uiSignupPagesGettingStartedLogoStrip">
        <img
          src="https://platform9.com/wp-content/uploads/2021/02/logo_juniper-networks_white.svg"
          alt="juniper-networks"
        />
        <img
          src="https://platform9.com/wp-content/uploads/2021/01/logo_kingfisher_white.svg"
          alt="kingfisher"
        />
        <img
          src="https://platform9.com/wp-content/uploads/2021/02/logo_redfin_white.svg"
          alt="redfin"
        />
        <img
          src="https://platform9.com/wp-content/uploads/2021/05/logo_mavenir_white.svg"
          alt="mavenir"
        />
        <img
          src="https://platform9.com/wp-content/uploads/2021/02/logo_snapfish_white.svg"
          alt="snapfish"
        />
        <img
          src="https://platform9.com/wp-content/uploads/2021/02/logo_cloudera_white.png"
          alt="cloudera"
        />
      </div>
    </div>
  )
}
