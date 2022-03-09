import React from 'react'

export default function LeftArrow({ size = 16, color = '#fff' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        transform="rotate(180 8 8)"
        d="M15.333 7.969c0 .133-.054.26-.15.353l-6.8 6.8a.5.5 0 0 1-.706 0l-.23-.228a.5.5 0 0 1 0-.707l5.562-5.561H1.166a.5.5 0 0 1-.5-.5v-.321a.5.5 0 0 1 .5-.5h11.843L7.448 1.748a.5.5 0 0 1 0-.706l.229-.226a.495.495 0 0 1 .706 0l6.8 6.8c.096.094.15.22.15.354z"
        fill={color}
        fillRule="nonzero"
      />
    </svg>
  )
}
