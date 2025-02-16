import React from 'react'

const Options = ({icon,text}) => {
  return (
    <div className="hover:bg-gray-600 w-48 rounded-2xl px-4 p-2">
    <div className="flex gap-6 items-center font-light">
     {icon}
      <h1>{text}</h1>
    </div>
  </div>
  )
}

export default Options