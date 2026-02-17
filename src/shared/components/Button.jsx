
import React from 'react'

export default function Button({ children, variant='primary', className = '', ...props }) {
  const v = variant === 'ghost' ? 'btnGlass' : variant === 'outline' ? 'btnOutline' : 'btnPrimary'
  return (
    <button className={`${v} btn ${className}`} {...props}>
      {children}
    </button>
  )
}
