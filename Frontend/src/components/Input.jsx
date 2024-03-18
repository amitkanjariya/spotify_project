import React, { useId } from 'react'

const Input = React.forwardRef(({ label, type = "text", className = "", ...props }, ref) => {
    const id = useId()
    return (
        <div className='w-full' >
            {
                label && <label htmlForfor={id} className='inline-block mb-1 pl-1'>{label}</label>
            }
            <input
                type={type}
                className={`px-3 py-2 rounded-full bg-neutral-700 text-white outline-none focus:bg-gray-50 duration-200 border border-gray-200 ${className}`}
                ref={ref}
                {...props}
                id={id}
            />
        </div>
    )
})

export default Input