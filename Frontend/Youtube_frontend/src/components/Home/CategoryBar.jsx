import React, { useState } from 'react'

const CategoryBar = ({handleCategoryChange,activeCategory}) => {
const list = ["All","Music","Funny","Sports","Movie","News","Study","Cricket","Kids","Gaming"]

function  handleClick(e) {
  handleCategoryChange(e.target.innerText)
}


  return (
    <div className='text-white p-1 overflow-auto sticky bg-black top flex gap-4'>

      {/* <h1 className='w-fit p-2 flex justify-center items-center px-3  rounded-md text-black bg-white'>All</h1> */}
      {
        list.map((l,index)=>(
          <h1 key={index} onClick={handleClick} className={`w-fit p-2 flex justify-center ${activeCategory==l?"text-black bg-white":" text-white bg-zinc-700"} items-center px-3 rounded-md`}>{l}</h1>
        ))
      }
         
    </div>
  )
}

export default CategoryBar