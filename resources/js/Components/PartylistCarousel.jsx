import React, { useState } from 'react'
import { Carousel, Tooltip } from "@material-tailwind/react";
import STISHSBacoorLogo from '../../../public/sti-images/STIBacoorSHSCouncilLogo.png';
import { Link } from '@inertiajs/react';
const PartylistCarousel = ({ partylistCarouselData }) => {

  return (
    <div className='w-full flex gap-2 flex-wrap'>

      <Carousel className="rounded-xl" autoplay autoplayDelay={5000} loop>
        {
          partylistCarouselData.map((partylist) => (
            <div className='flex justify-center' key={partylist.id}>
              <Link href={route('partylist.show', partylist.id)}>
                <img
                  src={`storage/${partylist.partylist_logo}`}
                  className="object-cover w-full rounded-lg text-gray-900 bg-cover bg-center brightness-95"
                  alt={partylist.partylist_name}
                />
              </Link>
            </div>
          ))
        }
      </Carousel>


    </div>
  )
}

export default PartylistCarousel