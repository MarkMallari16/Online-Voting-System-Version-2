import React from 'react'
import { Carousel } from "@material-tailwind/react";
import { useState } from 'react';
const PartylistCarousel = () => {
  const [zoomedImage, setZoomedImage] = useState(null);

  const handleImageClick = (imageClick) => {
    setZoomedImage(imageClick);
  }
  const handleCloseZoom = () => {
    setZoomedImage(null);
  };
  return (
    <div className='w-full flex mt-5 gap-2 flex-wrap'>
      <Carousel className="rounded-xl " autoplay autoplayDelay={5000} loop>
        <div className="w-full bg-white p-6 shadow-md rounded-lg text-gray-900 mb-5 cursor-pointer">

          <img src="https://scontent.fmnl8-1.fna.fbcdn.net/v/t39.30808-6/347013538_793800028654288_4030264139766344286_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeEgUTYiqoHU1ZUV_InMuJQLs4IyIjRbxqKzgjIiNFvGokstVKJpcFbYXASLdmMRZ2qDmVLAFRWMLtQBXke518_k&_nc_ohc=M9MdzhHpYH0Q7kNvgGRg6HH&_nc_ht=scontent.fmnl8-1.fna&oh=00_AfDhH1xlJTsS1f4MmLzHOfR30tIoFGEov3EyRTwKOoI_rA&oe=663BC532" alt="sandigan" className='rounded-md' onClick={() => handleImageClick("https://scontent.fmnl8-1.fna.fbcdn.net/v/t39.30808-6/347013538_793800028654288_4030264139766344286_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeEgUTYiqoHU1ZUV_InMuJQLs4IyIjRbxqKzgjIiNFvGokstVKJpcFbYXASLdmMRZ2qDmVLAFRWMLtQBXke518_k&_nc_ohc=M9MdzhHpYH0Q7kNvgGRg6HH&_nc_ht=scontent.fmnl8-1.fna&oh=00_AfDhH1xlJTsS1f4MmLzHOfR30tIoFGEov3EyRTwKOoI_rA&oe=663BC532")} />
        </div>

        <div className="w-full bg-white p-6 shadow-md rounded-lg text-gray-900 mb-5 cursor-pointer">

          <img src="https://scontent.fmnl8-2.fna.fbcdn.net/v/t39.30808-6/347107950_112164691880341_572114331147413847_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeFjHueT_2Xp6dzYdU7geVcp09tOX3sNPT3T205few09PQWGvxl_oPMo9EuJidAkQKF28pe41ZqesGhR7cYQpV9m&_nc_ohc=fFjTOJG0caQQ7kNvgE_1sRk&_nc_ht=scontent.fmnl8-2.fna&oh=00_AfDBp08RzL0AVyF4sZJlISZiaxsCbUHwtiD0vSI__nGh6g&oe=663BD182" alt="Sanaol" className='rounded-md' onClick={() => handleImageClick("https://scontent.fmnl8-2.fna.fbcdn.net/v/t39.30808-6/347107950_112164691880341_572114331147413847_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeFjHueT_2Xp6dzYdU7geVcp09tOX3sNPT3T205few09PQWGvxl_oPMo9EuJidAkQKF28pe41ZqesGhR7cYQpV9m&_nc_ohc=fFjTOJG0caQQ7kNvgE_1sRk&_nc_ht=scontent.fmnl8-2.fna&oh=00_AfDBp08RzL0AVyF4sZJlISZiaxsCbUHwtiD0vSI__nGh6g&oe=663BD182")} />
        </div>
      </Carousel>
      {zoomedImage && (
        <div className="fixed top-0 left-0 z-50 w-full h-full bg-black bg-opacity-75 flex justify-center items-center" onClick={handleCloseZoom}>

          <img
            src={zoomedImage}
            alt="Zoomed"
            className="max-h-full max-w-full"
          />
        </div>
      )}



    </div>
  )
}

export default PartylistCarousel