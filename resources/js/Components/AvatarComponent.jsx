import { Avatar } from '@material-tailwind/react'
import React from 'react'
import DefaultProfilePicture from '../../../public/storage/images/default_profile.png'
const AvatarComponent = ({ Profile }) => {


    return (
        <>
            <Avatar
                src={
                    `storage/${Profile}`
                }
            />
        </>
    )
}

export default AvatarComponent