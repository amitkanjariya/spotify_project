import React from 'react'

function Button({
    type,
    id,
    className = '',
    onClick,
    
    ...props
}) {
    return (
       <button className={`py-2 px-1 font-semibold font-Poppins rounded-full ${className}` }{...props}></button>
    )
}

export default Button