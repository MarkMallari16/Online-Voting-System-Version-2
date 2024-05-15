import React, { useState } from 'react'
import { Carousel, Tooltip } from "@material-tailwind/react";
import STISHSBacoorLogo from '../../../public/sti-images/STIBacoorSHSCouncilLogo.png';
import { Link } from '@inertiajs/react';
const PartylistCarousel = ({ partylistCarouselData }) => {
  console.log(partylistCarouselData)
  return (
    <div className='w-full flex mt-5 gap-2 flex-wrap'>
      <Carousel className="rounded-xl " autoplay autoplayDelay={5000} loop>

        {
          partylistCarouselData.map((partylist) => (
            <Link key={partylist.id} href={route('partylist.show', partylist.id)}>
              <div className="w-full bg-white p-6 shadow-sm rounded-lg text-gray-900 mb-5 cursor-pointer">
                <img src={`storage/${partylist.partylist_logo}`} alt="sandigan" className='rounded-md' />
              </div>
            </Link>
          ))
        }
      </Carousel>
    </div>
  )
}

export default PartylistCarousel