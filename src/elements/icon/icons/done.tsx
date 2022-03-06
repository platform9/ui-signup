import React from 'react'
import { pxToRem } from '../../../helpers'

const ratio = 12 / 9

export default function Done({ size, color = '#E6E6EA' }) {
  const width = pxToRem(size * ratio)
  const height = pxToRem(size)
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 12 9"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>icon/check copy</title>
      <g
        id="Sign-Up-Flow-(Sandbox-v2)"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <g
          id="07b_Sign-Up-Flow---Password-Filled"
          transform="translate(-316.000000, -668.000000)"
          fill={color}
        >
          <g id="Group-4" transform="translate(160.000000, 226.000000)">
            <g id="Group" transform="translate(156.000000, 440.000000)">
              <g id="check" transform="translate(0.500000, 2.000000)">
                <path
                  d="M10.6232367,0.628599034 L10.8804348,0.911304348 C11.0257807,1.0722247 11.0139106,1.32031006 10.8538647,1.46661836 L3.3568599,8.27971014 C3.2843561,8.34536699 3.19003645,8.38173913 3.09222222,8.38173913 C2.98153676,8.38173913 2.87598524,8.33505503 2.80154589,8.2531401 L0.102028986,5.2826087 C-0.0436135286,5.1217945 -0.0317319257,4.873469 0.128599034,4.72729469 L0.411304348,4.47009662 C0.48858992,4.40015706 0.590424521,4.36366474 0.694541063,4.36859903 C0.798705375,4.37320703 0.896688583,4.41932803 0.966618357,4.49666667 L3.14536232,6.89381643 L10.0679227,0.602028986 C10.2287369,0.456386471 10.4770624,0.468268074 10.6232367,0.628599034 Z"
                  id="Shape"
                ></path>
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  )
}
