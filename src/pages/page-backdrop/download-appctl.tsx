import React, { useState } from 'react'
import Button from '../../elements/button'
import Link from '../../elements/link'
import Text from '../../elements/text'

export default function DownloadAppCtl() {
  const [expanded, setExpanded] = useState(false)
  const handleClick = () => {
    setExpanded(!expanded)
  }
  return (
    <div className="uiSignupAppPageBackdropDownloadAppCtl">
      <article>
        <Text variant="subtitle1" className="DownloadAppCtl__Title">
          Want to run Apps, not Clusters?
        </Text>
        <Text variant="body-large" className="DownloadAppCtl__Body">
          Deploy your app on Kubernetes in seconds with <b>Appctl</b>
        </Text>

        <div className="uiSignupAppDownloadChoiceContainer">
          <Button icon="download" onClick={handleClick} color="secondary">
            Download Appctl
          </Button>
          <div className={`uiSignupAppDownloadOptionContainer${expanded ? ' open' : ''}`}>
            <ul className="download-options">
              <li>
                <a
                  href="https://pmkft-assets.s3.us-west-1.amazonaws.com/appctl/macos/appctl"
                  id="appctl-mac"
                  download
                >
                  <Text variant="body1">Get Appctl for MacOS</Text>
                </a>
              </li>
              <li>
                <a
                  href="https://pmkft-assets.s3.us-west-1.amazonaws.com/appctl/windows/appctl"
                  id="appctl-win"
                  download
                >
                  <Text variant="body1">Get Appctl for Windows</Text>
                </a>
              </li>
              <li>
                <a
                  href="https://pmkft-assets.s3.us-west-1.amazonaws.com/appctl/linux/appctl"
                  id="appctl-linux"
                  download
                >
                  <Text variant="body1">Get Appctl for Linux</Text>
                </a>
              </li>
            </ul>
            <Text variant="body2" className="uiSignupElementsTextGrey200 download-appctl-agreement">
              Use of appctl is subject to Platform9's{' '}
              <Link
                href="/terms-conditions/"
                target="_blank"
                fixWhitespace={false}
                textClassName="uiSignupElementsTextGrey200"
                variant="caption1"
              >
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link
                href="/terms-conditions/privacy/"
                target="_blank"
                fixWhitespace={false}
                textClassName="uiSignupElementsTextGrey200"
                variant="caption1"
              >
                Privacy Policy
              </Link>
              .
            </Text>
          </div>
        </div>
      </article>
    </div>
  )
}
