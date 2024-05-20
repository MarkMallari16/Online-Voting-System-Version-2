import React, { useState } from 'react'
import { Carousel, Tooltip } from "@material-tailwind/react";
import STISHSBacoorLogo from '../../../public/sti-images/STIBacoorSHSCouncilLogo.png';
import { Link } from '@inertiajs/react';
const PartylistCarousel = ({ partylistCarouselData }) => {
  console.log(partylistCarouselData)
  return (
    <div className='w-full flex mt-5 gap-2 flex-wrap'>

      <Carousel className="rounded-xl " autoplay autoplayDelay={5000} loop
      >
        <div>
          <div className="w-full h-full rounded-lg text-gray-900 mb-5 ">
            <img src={STISHSBacoorLogo} alt="sandigan" className='rounded-md brightness-95' />
          </div>
        </div>

        {
          partylistCarouselData.map((partylist) => (
            <div className='flex justify-center' key={partylist.id}>
              <div
                className="w-full h-screen rounded-lg text-gray-900 mb-5 bg-cover bg-center"
                style={{ backgroundImage: `url(storage/${partylist.partylist_logo})` }}
              >
                <div>

                  <div>

                  </div>
                </div>
                <Link href={route('partylist.show', partylist.id)}> </Link>
              </div>
            </div>
          ))
        }
      </Carousel>


    </div>
  )
}

export default PartylistCarousel