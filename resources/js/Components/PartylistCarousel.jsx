import React from 'react'
import { Carousel } from "@material-tailwind/react";
import { useState } from 'react';
const PartylistCarousel = ({ partyList }) => {
  console.log(partyList)
  return (
    <div className='w-full flex mt-5 gap-2 flex-wrap'>
      <Carousel className="rounded-md " autoplay autoplayDelay={5000} loop>
        <div className="w-full bg-white p-6 shadow-md rounded-lg text-gray-900 mb-5 cursor-pointer">

          {partyList.map((party) => (
            <img key={party.id} src={`storage/${party.partylist_logo}`} />
          ))}
        </div>

      </Carousel>
    </div>
  )
}

export default PartylistCarousel