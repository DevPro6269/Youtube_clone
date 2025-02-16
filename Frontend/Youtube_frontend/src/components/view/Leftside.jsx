import React from 'react'

const Leftside = () => {
  return (
    <div className='w-[70%]  gap-6 flex flex-col'>


    <section className='w-[100%]  h-[70%] p-1 mx-auto'>
    <video 
  className="h-full rounded-2xl w-full max-w-full" 
  src="https://res.cloudinary.com/dqlryem36/video/upload/v1739518712/Youtube/youtube_video_1739518707198.mp4" 
  controls
  loop
  autoPlay
  poster="https://example.com/your-thumbnail-image.jpg" // Optional: If you want to show a thumbnail before the video starts
>
  Your browser does not support the video tag.
</video>
    </section>

    <section className='w-[75%]'>
        <h1 className='text-xl overflow-hidden p-2 whitespace-nowrap text-ellipsis'>Maiyya Mainu - Lyrical | Jersey | Shahid Kapoor, Mrunal Thakur| Sachet-Parampara| Shellee | Gowtam T iwhkdbkejhbfkjhcbdshjkbejlhfbclhejb</h1>
    </section>

     <section className='flex justify-between'>
          <div className='flex gap-3 items-center '>
             <div className='h-12 w-12 rounded-full bg-amber-300'>
              <img src="" alt="" />
             </div>
             <div className='flex flex-col'>
              <h1 className='text-xl'>Moon dreams</h1>
              <p className='text-gray-500'>57.4k subscribers</p>
             </div>
             <div>
              <button className='p-2 rounded-full bg-white text-black'>Subscribe</button>
             </div>
          </div>

           {/* chaneel and video info bar */}
          <div className='flex items-center gap-2'>

            <div className=' bg-zinc-800 rounded-full flex'>
           <div className='p-2 flex items-center gap-1 hover:bg-zinc-500 rounded-l-full'>
           <i class="fa-regular  fa-thumbs-up p-1"></i>
           <p className=''>17K</p>
           </div>


           <div className='w-[2px] h-12 bg-gray-700'></div>
           <div className=' px-4 flex items-center gap-1 hover:bg-zinc-500 rounded-r-full'>
           <i class="fa-regular  fa-thumbs-down"></i>
           </div>
            </div>




            <div className='flex items-center hover:bg-zinc-600 h-11 rounded-3xl gap-2 bg-zinc-800  px-3'>
            <i class="fa-solid fa-share"></i>
          <h1>Share</h1>
            </div>

            <div className='flex items-center h-11 hover:bg-zinc-600 rounded-3xl gap-2 bg-zinc-800  px-3'>
            <i class="fa-solid fa-download"></i>
          <h1>Download</h1>
            </div>


            <div className='flex items-center h-10 w-10 hover:bg-zinc-600 justify-center rounded-full gap-2 bg-zinc-800  p-2'>
            <i class="fa-solid fa-ellipsis"></i>  
            </div>
          </div>

         
     </section>



 {/* section for description box */}
         <section className='bg-zinc-800 flex flex-col rounded-2xl p-5'>
          <p>9,891,703 views  14 Feb 2023  #ShapeofYou #EdSheeran #ShapeofYoulyrics</p>
          <p>Baby It's You - Revel Day (Lyrics)   </p>
          <p className='w-[80%]'>Veer & Zaara's love was eternal and Zaara could feel his presence even when he wasn’t around! Enjoy the track ‘Main Yahaan Hoon’ from Veer-Zaara!
          </p>
          </section>

          {/* /////// */}

{/* section for comment  and review */}
          <section>
              <div className='flex gap-12'>
              <div className='p-4'>
              <h1 className='text-xl'>65,318 Comments</h1>
              </div>

              <div className='flex gap-4 items-center'>
              <i class="fa-solid fa-lg fa-sort"></i>
                <p>Sort</p>
              </div>
              </div>

              {/* input div add new comment */}
              <div className='flex items-center gap-3'>
                <div className='h-10 w-10 bg-amber-200 rounded-full'>
                  <img src="" alt="" />
                </div>

                <form action="" className='w-full flex gap-2 flex-col'>
                <div className='w-[100%]'>
                  <input type="text" className='outline-none w-full border-b' placeholder='add comment' />
                </div>
                <div className='flex gap-5 self-end'>
                   <button className='p-2 hover:bg-gray-700 px-3 rounded-3xl'>cancel</button>
                   <button className='p-2 bg-gray-700 px-4 rounded-2xl'>comment</button>
                </div>
                </form>
              </div>
          </section>


{/* section for showing comments */}
  
  <section>
    <div className='flex items-center gap-2'>
      <div className=' w-[6%] rounded-full'>
      <img src="https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D" className='w-12 h-12 object-cover rounded-full ' alt="" />
      </div>

      <div className='w-[75%]'>
        <p>@Xavier . <span className='text-gray-400'>2 years ago</span></p>
        <p>I think this was the peak of srk's look. He had never looked as good as he was in this movie.even those highlights of his hair is fab. This movie is a master piece. Everything about it is beautiful. Story, dailogues, acting, location, background scores and songs everything.</p>
      </div>
      <div className='w-[15%] flex justify-end'>
      <i class="fa-solid fa-lg fa-ellipsis-vertical  hover:bg-zinc-600"></i>
      </div>
    </div>

  </section>

    </div>
  )
}

export default Leftside