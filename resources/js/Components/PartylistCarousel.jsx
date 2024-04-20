import React from 'react'
import { Carousel } from "@material-tailwind/react";
const PartylistCarousel = () => {
  return (
    <div className='w-full flex mt-5 gap-2 flex-wrap'>
    <Carousel className="rounded-xl" autoplay autoplayDelay={5000} loop>
        <div className="w-full bg-white p-6 shadow-md rounded-lg text-gray-900">
            <h1 className="text-xl font-bold mb-5 ">Sandigan Partylist</h1>
            <img src="https://scontent.fmnl15-1.fna.fbcdn.net/v/t39.30808-6/347013538_793800028654288_4030264139766344286_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeEgUTYiqoHU1ZUV_InMuJQLs4IyIjRbxqKzgjIiNFvGokstVKJpcFbYXASLdmMRZ2qDmVLAFRWMLtQBXke518_k&_nc_ohc=2OyAMIAWQdMAb70lvwp&_nc_ht=scontent.fmnl15-1.fna&oh=00_AfBw7gSyYfm6CB-spHUrOO-Fkrq-JiXRze1167pS11MwqA&oe=66278E32" alt="sandigan" className='rounded-md' />
        </div>

        <div className="w-full bg-white p-6 shadow-md rounded-lg text-gray-900">
            <h1 className="text-xl font-bold mb-5">Sanaol Partylist</h1>
            <img src="https://scontent.fmnl15-1.fna.fbcdn.net/v/t39.30808-6/347107950_112164691880341_572114331147413847_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeFjHueT_2Xp6dzYdU7geVcp09tOX3sNPT3T205few09PQWGvxl_oPMo9EuJidAkQKF28pe41ZqesGhR7cYQpV9m&_nc_ohc=6xw5MGszlZkAb4znXhR&_nc_ht=scontent.fmnl15-1.fna&oh=00_AfDrjIE5JKrAkzGkXO5PdUK2PfmujoPzwu2ccI-XsYjXvQ&oe=66279A82" alt="Sanaol" className='rounded-md' />
        </div>
    </Carousel>




</div>
  )
}

export default PartylistCarousel