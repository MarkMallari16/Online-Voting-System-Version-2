import React, { useState } from 'react'
import { Carousel } from "@material-tailwind/react";
<<<<<<< HEAD

const PartylistCarousel = ({partylistCarouselData}) => {

  return (
    <div className='w-full flex mt-5 gap-2 flex-wrap'>
      <Carousel className="rounded-xl " autoplay autoplayDelay={5000} loop>
        {
          partylistCarouselData.map((partylist) => (
            <div key={partylist.id} className="w-full bg-white p-6 shadow-sm rounded-lg text-gray-900 mb-5 cursor-pointer">
              <img src={`storage/${partylist.partylist_logo}`} alt="sandigan" className='rounded-md' />
            </div>
          ))
        }
=======
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

>>>>>>> 322bd4894822b2699a0f1730a42d9fab92e91933
      </Carousel>
    </div>
  )
}

export default PartylistCarousel