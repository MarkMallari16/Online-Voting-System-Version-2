import { Avatar } from '@material-tailwind/react'
import React from 'react'

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