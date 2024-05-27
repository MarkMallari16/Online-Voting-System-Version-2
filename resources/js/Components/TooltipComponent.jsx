import { Tooltip } from '@material-tailwind/react'
import React from 'react'

function TooltipComponent({ name }) {
    return (
        <Tooltip content={name} placement="bottom">
            <span>
                {name}
            </span>
        </Tooltip>
    )
}

export default TooltipComponent