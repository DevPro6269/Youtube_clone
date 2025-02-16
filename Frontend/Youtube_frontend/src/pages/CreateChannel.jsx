import React from 'react'

export const CreateChannel = () => {
  return (
    // <div className='bg-white h-[80%] w-[75%] top-20 left-52 absolute '>

    // </div>


    <div className='h-screen w-screen absolute top-0 z-10 bg-transparent  flex justify-center items-center'>
        <div className=' bg-white h-[80%] w-[80%] flex flex-col justify-between p-5 rounded-2xl'>

            <div className='p-3'>
                <h1 className='text-3xl'>How you'll appear</h1>
            </div>
            
           <form action="" className=' -mt-10 self-center'>
           <div className='flex flex-col gap-6'>
                <div className='flex items-center flex-col gap-4'>
                    <div className='h-24 w-24 rounded-full flex justify-center items-end pb-4 bg-blue-300'>
                    <i class="fa-solid text-6xl fa-user text-blue-600"></i>
                    </div>
                    <p className='text-blue-500'>select picture</p>
                </div>

                <div className='flex  items-center flex-col gap-2'>
                    <div className='border w-[40%] rounded-md px-1'>
                        <label className='text-sm' htmlFor="channelName">Name</label> <br />
                        <input type="text" className='outline-none w-full' />
                    </div>
                    <div className='border w-[40%] rounded-md px-1'>
                        <label className='text-sm' htmlFor="channelName">Description</label> <br />
                        <input type="text" className='outline-none w-full' />
                    </div>
                </div>
                <div className='flex justify-center'>
                    <p className='w-[70%]'>By clicking create channel you agree to Youtube
                         Terms's Of Service.Changes need to your name 
                         profile picture are visible only on youTube and 
                         not other google services.Leran More</p>
                </div>
            </div>
           </form>


            <div className='flex gap-5 justify-end  items-end p-2'>
                <p>Cancel</p>
                <p className='text-blue-400'>Create channel</p>
            </div>
        </div>
    </div>
  )
}
