import { Avatar } from '@material-tailwind/react'
import React from 'react'
import DefaultProfilePicture from '../../../public/storage/images/default_profile.png'
const AvatarComponent = ({ Profile, size }) => {


    return (
        <>
            <Avatar
                src={
                    `storage/${Profile}`
                }
                size={size}
            />
        </>
    )
}

export default AvatarComponent