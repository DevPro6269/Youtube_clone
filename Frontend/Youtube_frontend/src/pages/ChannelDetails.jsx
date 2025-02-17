import React from 'react'
import VideoCard from '../components/Channel/VideoCard'

const ChannelDetails = () => {
  return (
   <>
   <div className='w-[82%] p-2 flex gap-4 flex-col text-white bg-black h-screen'>
     
    <section className=' w-[95%] h-[22%] flex '>
           <div className='w-full h-full rounded-2xl  bg-zinc-600'>
            <img className='h-full w-full rounded-2xl' src="https://yt3.googleusercontent.com/t8Npp2r-fLu6dqvEMItpuvzBy-zkFQr7j69bcMB3gGvc4ogdhs-8dZ9O46iMmPHdka_Bs2i77HY=w2276-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj" alt="" />
           </div>
    </section>


      <section className=' h-[21%] w-[90%] flex gap-2 '>
        <div className=' h-full w-[16%] rounded-full bg-red-500'>
        <img src="https://lh3.googleusercontent.com/a/ACg8ocJx8fVZU6jbTTV07FaYwUPbur-tb2s7mptPFQpu8OWmABH_0544=s576-c-no"
        className='w-full h-full rounded-full object-cover'
        alt="" />
        </div>
        <div className='flex flex-col gap-2'>
             <h1 className='text-3xl'>Deva Bhai</h1>
             <h1>@devabhai11m . <span className='text-gray-400'>6.3M Subscribers . 2.8K Videos</span></h1>
              <p>Welcome to the official YouTube channel for the UK's No.1 Hit Music Station, Capital 🎉
              </p>
              <button className='p-2 rounded-4xl bg-white text-black w-32'>Subscribe</button>
        </div>
      </section>

      <section className=' border-b-[1px] border-b-zinc-700 flex px-5 gap-8 '>
        <h1 className=' hover:border-b-2 py-2 font-semibold'>Home</h1>
        <h1 className=' border-b-2 py-2 font-semibold'>Videos</h1>
        <h1 className=' hover:border-b-2 py-2 font-semibold'>Shorts</h1>
        <h1 className=' hover:border-b-2 py-2 font-semibold'>Playlist</h1>
      </section>

      {/* <div className='h-[1px] w-full bg-zinc-600'></div> */}

         <section className=' flex  px-8 gap-3 flex-col'>
            <div className='flex gap-2'>
                <button className='bg-white text-black rounded-md px-4 p-[5px]'>Latest</button>
                <button className='bg-zinc-700 rounded-md px-4 p-[5px]'>Popular</button>
                <button className='bg-zinc-700 rounded-md px-4 p-[5px]'>Oldest</button>
            </div>

     <div className='flex flex-wrap p-2'>
      <VideoCard/>
     </div>


         </section>

   </div>
   </>
  )
}

export default ChannelDetails