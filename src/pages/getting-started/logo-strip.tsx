// Libs
import React from 'react'
import { PartnerLogos, partnerLogoURLs } from '../../constants'

// Elements
import Text from '../../elements/text'

export default function LogoStrip() {
  return (
    <div className="uiSignupPagesGettingStartedLogoStripContainer">
      <Text variant="subtitle2" className="uiSignupElementsTextBlue200">
        Join the Ranks of Modern Cloud Platform Teams
      </Text>
      <div className="uiSignupPagesGettingStartedLogoStrip">
        <img src={partnerLogoURLs[PartnerLogos.Juniper]} alt={PartnerLogos.Juniper} />
        <img src={partnerLogoURLs[PartnerLogos.Kingfisher]} alt={PartnerLogos.Kingfisher} />
        <img src={partnerLogoURLs[PartnerLogos.Redfin]} alt={PartnerLogos.Redfin} />
        <img src={partnerLogoURLs[PartnerLogos.Mavenir]} alt={PartnerLogos.Mavenir} />
        <img src={partnerLogoURLs[PartnerLogos.Snapfish]} alt={PartnerLogos.Snapfish} />
        <img src={partnerLogoURLs[PartnerLogos.Cloudera]} alt={PartnerLogos.Cloudera} />
      </div>
    </div>
  )
}
