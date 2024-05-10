import { Avatar } from '@material-tailwind/react'
import React from 'react'
import DefaultProfilePicture from '../../../public/images/user.png'
const AvatarComponent = ({ Profile }) => {
    return (
        <>
            <Avatar
                src={
                    Profile ? `storage/${Profile}` : DefaultProfilePicture
                }
            />
        </>
    )
}

export default AvatarComponent