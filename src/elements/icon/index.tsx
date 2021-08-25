import React from 'react'
import './style.css'

interface Props extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> {
  icon: keyof typeof icons
  size?: number
  className?: string
  color?: string
}

export default function Icon({ icon, size = 16, color = '', className = '', ...props }: Props) {
  return (
    <i
      style={{ width: size, height: size }}
      className={`uiSignupElementsIcon uiSignupElementsIcon${color} ${className}`}
      {...props}
    >
      {icons[icon]}
    </i>
  )
}

// We need to define these inline as imports try to pull the image under /media/static
// But when integrated to the website this route doesn't exist
// TODO look at uploading these into wp itself
const icons = {
  'right-arrow': (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
      <path
        d="M15.333 7.969c0 .133-.054.26-.15.353l-6.8 6.8a.5.5 0 0 1-.706 0l-.23-.228a.5.5 0 0 1 0-.707l5.562-5.561H1.166a.5.5 0 0 1-.5-.5v-.321a.5.5 0 0 1 .5-.5h11.843L7.448 1.748a.5.5 0 0 1 0-.706l.229-.226a.495.495 0 0 1 .706 0l6.8 6.8c.096.094.15.22.15.354z"
        fill="#fff"
        fill-rule="nonzero"
      />
    </svg>
  ),
  'left-arrow': (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
      <path
        transform="rotate(180 8 8)"
        d="M15.333 7.969c0 .133-.054.26-.15.353l-6.8 6.8a.5.5 0 0 1-.706 0l-.23-.228a.5.5 0 0 1 0-.707l5.562-5.561H1.166a.5.5 0 0 1-.5-.5v-.321a.5.5 0 0 1 .5-.5h11.843L7.448 1.748a.5.5 0 0 1 0-.706l.229-.226a.495.495 0 0 1 .706 0l6.8 6.8c.096.094.15.22.15.354z"
        fill="#fff"
        fill-rule="nonzero"
      />
    </svg>
  ),
  info: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path
        fill="#00abe8"
        d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-.001 5.75c.69 0 1.251.56 1.251 1.25s-.561 1.25-1.251 1.25-1.249-.56-1.249-1.25.559-1.25 1.249-1.25zm2.001 12.25h-4v-1c.484-.179 1-.201 1-.735v-4.467c0-.534-.516-.618-1-.797v-1h3v6.265c0 .535.517.558 1 .735v.999z"
      ></path>
    </svg>
  ),
  done: (
    <svg
      width="12px"
      height="9px"
      viewBox="0 0 12 9"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>icon/check copy</title>
      <g
        id="Sign-Up-Flow-(Sandbox-v2)"
        stroke="none"
        stroke-width="1"
        fill="none"
        fill-rule="evenodd"
      >
        <g
          id="07b_Sign-Up-Flow---Password-Filled"
          transform="translate(-316.000000, -668.000000)"
          fill="#E6E6EA"
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
  ),
}
