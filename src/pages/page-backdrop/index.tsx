// Styles
import './style.css'

// Libs
import React from 'react'

// Components
import ManagementPlane from './management-plane'
import DownloadAppCtl from './download-appctl'

export default function PageBackdrop() {
  return (
    <div className="uiSignupAppPageBackdrop">
      <div className="uiSignupAppPageBackdropGradient" />
      <ManagementPlane />
    </div>
  )
}
