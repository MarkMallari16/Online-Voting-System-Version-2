import React, { useState } from 'react'
import { Carousel } from "@material-tailwind/react";
import STISHSBacoorLogo from '../../../public/sti-images/STIBacoorSHSCouncilLogo.png';
const PartylistCarousel = ({ partylistCarouselData }) => {

  return (
    <div className='w-full flex mt-5 gap-2 flex-wrap'>
      <Carousel className="rounded-xl " autoplay autoplayDelay={5000} loop>
        <div>
          <img src={STISHSBacoorLogo} alt="STI Bacoor Logo" />
        </div>
        {
          partylistCarouselData.map((partylist) => (
            <div key={partylist.id} className="w-full bg-white p-6 shadow-sm rounded-lg text-gray-900 mb-5 cursor-pointer">
              <img src={`storage/${partylist.partylist_logo}`} alt="sandigan" className='rounded-md' />
            </div>
          ))
        }
      </Carousel>
    </div>
  )
}

export default PartylistCarousel