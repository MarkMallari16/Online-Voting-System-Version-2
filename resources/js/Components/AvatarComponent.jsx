import { Avatar } from '@material-tailwind/react'
import React from 'react'
<<<<<<< HEAD
import DefaultProfilePicture from '../../../public/storage/images/default_profile.png'
const AvatarComponent = ({ Profile, size }) => {


=======
import DefaultProfilePicture from '../../../public/storage//images/default_profile.png'
const AvatarComponent = ({ Profile,size }) => {
>>>>>>> 322bd4894822b2699a0f1730a42d9fab92e91933
    return (
        <>
            <Avatar
                src={
<<<<<<< HEAD
                    `storage/${Profile}`
                }
<<<<<<< HEAD
=======
                    Profile ? `storage/${Profile}` : DefaultProfilePicture
                }
                size={size}
>>>>>>> 322bd4894822b2699a0f1730a42d9fab92e91933
=======
                size={size}
>>>>>>> a5d97759504b06652679829a51d708a4355848c1
            />
        </>
    )
}

export default AvatarComponent