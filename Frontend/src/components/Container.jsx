import React from 'react'

function Container({children,className=""}) {
  return (
    <div className={`w-auto bg-black ${className}`}>
    {children}
    </div>
  )
}

export default Container