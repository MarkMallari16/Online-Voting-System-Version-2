import React from 'react'
import { Carousel } from "@material-tailwind/react";
const PartylistCarousel = () => {
  return (
    <div className='w-full flex mt-5 gap-2 flex-wrap'>
      <Carousel className="rounded-xl " autoplay autoplayDelay={5000} loop>
        <div className="w-full bg-white p-6 shadow-md rounded-lg text-gray-900 mb-5">
          <img src="https://scontent.fmnl8-1.fna.fbcdn.net/v/t39.30808-6/346985383_575521851387348_4628907800663859878_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeE4cRwQrSza7QxmYU-l53YEJQHASDqwam0lAcBIOrBqbQM6zBnEvsm0ab7Y07RNpBUOJbDWw6KR6JXBhjouv610&_nc_ohc=LSSrEOdmfVoAb5qVFRZ&_nc_ht=scontent.fmnl8-1.fna&oh=00_AfBQz7QV8NDiRkSGhwvlkfnGvY6UrtzUBTksMFS_5daOxA&oe=662FABDF" alt="sandigan" className='rounded-md' />
        </div>
        <div className="w-full bg-white p-6 shadow-md rounded-lg text-gray-900 mb-5">

          <img src="https://scontent.fmnl8-1.fna.fbcdn.net/v/t39.30808-6/347013538_793800028654288_4030264139766344286_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeEgUTYiqoHU1ZUV_InMuJQLs4IyIjRbxqKzgjIiNFvGokstVKJpcFbYXASLdmMRZ2qDmVLAFRWMLtQBXke518_k&_nc_ohc=XZ9ISO0LeAgQ7kNvgHsrTzb&_nc_ht=scontent.fmnl8-1.fna&oh=00_AfBEi8_j2Tk14ci3VGJb1s2iUXBLT61B6vmKvztD-RC2-A&oe=662FAF72" alt="sandigan" className='rounded-md' />
        </div>

        <div className="w-full bg-white p-6 shadow-md rounded-lg text-gray-900 mb-5">

          <img src="https://scontent.fmnl8-2.fna.fbcdn.net/v/t39.30808-6/347107950_112164691880341_572114331147413847_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeFjHueT_2Xp6dzYdU7geVcp09tOX3sNPT3T205few09PQWGvxl_oPMo9EuJidAkQKF28pe41ZqesGhR7cYQpV9m&_nc_ohc=OZIXxpicQH0Q7kNvgHBBils&_nc_ht=scontent.fmnl8-2.fna&oh=00_AfAx4pdO4aqUWgZ9fWu2nm4uIyXwLOEiDpRzIxmvhaT0JQ&oe=662F8382" alt="Sanaol" className='rounded-md' />
        </div>
      </Carousel>




    </div>
  )
}

export default PartylistCarousel