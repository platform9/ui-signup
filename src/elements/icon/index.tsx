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
      style={{ fontSize: size }}
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
    <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M15.333 7.969c0 .133-.054.26-.15.353l-6.8 6.8a.5.5 0 0 1-.706 0l-.23-.228a.5.5 0 0 1 0-.707l5.562-5.561H1.166a.5.5 0 0 1-.5-.5v-.321a.5.5 0 0 1 .5-.5h11.843L7.448 1.748a.5.5 0 0 1 0-.706l.229-.226a.495.495 0 0 1 .706 0l6.8 6.8c.096.094.15.22.15.354z"
        fill="#fff"
        fill-rule="nonzero"
      />
    </svg>
  ),
  'left-arrow': (
    <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
      <path
        transform="rotate(180 8 8)"
        d="M15.333 7.969c0 .133-.054.26-.15.353l-6.8 6.8a.5.5 0 0 1-.706 0l-.23-.228a.5.5 0 0 1 0-.707l5.562-5.561H1.166a.5.5 0 0 1-.5-.5v-.321a.5.5 0 0 1 .5-.5h11.843L7.448 1.748a.5.5 0 0 1 0-.706l.229-.226a.495.495 0 0 1 .706 0l6.8 6.8c.096.094.15.22.15.354z"
        fill="#fff"
        fill-rule="nonzero"
      />
    </svg>
  ),
}
