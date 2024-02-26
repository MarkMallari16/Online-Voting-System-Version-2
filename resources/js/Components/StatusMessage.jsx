import React from 'react'
import { Alert } from "@material-tailwind/react";
const StatusMessage = ({ color, info }) => {
    return (
        <Alert color={color} className='my-4'>{info}</Alert>
    )
}

export default StatusMessage