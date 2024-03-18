import React, { useId } from 'react'

function Select({
    label,
    options,
    className,
    ...props
},ref) {
    const id = useId()
  return (
    <div className='w-full'>
        {
            label && <label htmlFor={id} className='inline-block mb-1 pl-1'></label>
        }
        <select className={`px-3 py-2 rounded-md bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`} id={id} {...props} ref={ref}>
           {
            options?.map((option)=>{
              <option key={option} value={option}>{option}</option>
            })
           }
        </select>
    </div>
  )
}

export default React.forwardRef(Select)