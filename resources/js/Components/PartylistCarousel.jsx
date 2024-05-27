import React, { useState } from 'react'
<<<<<<< HEAD
import { Carousel } from "@material-tailwind/react";
<<<<<<< HEAD

const PartylistCarousel = ({partylistCarouselData}) => {
=======
import { Carousel, Tooltip } from "@material-tailwind/react";
import STISHSBacoorLogo from '../../../public/sti-images/STIBacoorSHSCouncilLogo.png';
import { Link } from '@inertiajs/react';
const PartylistCarousel = ({ partylistCarouselData }) => {
>>>>>>> a5d97759504b06652679829a51d708a4355848c1

  return (
    <div className='w-full flex mt-5 gap-2 flex-wrap'>

      <Carousel className="rounded-xl" autoplay autoplayDelay={5000} loop>
        {
          partylistCarouselData.map((partylist) => (
            <div className='flex justify-center' key={partylist.id}>
              <Link href={route('partylist.show', partylist.id)}>
                <img
                  src={`storage/${partylist.partylist_logo}`}
                  className="object-cover w-full rounded-lg text-gray-900 mb-5 bg-cover bg-center brightness-95"
                  alt={partylist.partylist_name}
                />
              </Link>
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