import React, { useState } from 'react'
import MarkDown from 'react-markdown'

const CreationItem = ({item}) => {
    const [expanded,setExpanded]=useState(false);
  return (
    <div onClick={()=>setExpanded(!expanded)} className='bg-white cursor-pointer p-3 mb-2 rounded '>
       <div className='flex justify-between gap-3 items-center'>
       <div>
            <h2 className='text-xs sm:text-sm md:text-md mb-2 '>{item?.prompt}</h2>
            <p className='text-xs sm:text-sm text-gray-500'>{item?.type} || {new Date(item?.createdAt).toLocaleDateString()}</p>
        </div>
       <button className='bg-blue-400 text-white p-2 text-xs rounded-lg '>{item?.type}</button>
       </div>
       {
        expanded && (
            <div>
                {
                    item?.type==='image'?(
                        <div>
                            <img className='mt-3 w-full max-w-md' src={item?.content} alt="" />
                        </div>
                    ):(
                        <div className='mt-3 h-full overflow-y-scroll text-xs text-gray-800'>
                            <div className='reset-tw'>
                                <MarkDown>{item?.content}</MarkDown>
                            </div>
                        </div>
                    )
                }
            </div>
        )
       }
    </div>
  )
}

export default CreationItem
