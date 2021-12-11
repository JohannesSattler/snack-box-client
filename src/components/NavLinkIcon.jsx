import React from 'react'
import { Button } from '@mui/material'
import { Link } from 'react-router-dom'

function NavLinkIcon(props) {
    const {text, path, Icon} = props

    return (
        <Link to={path} style={{margin: '0 10px', color: '#8f8f8f', textDecoration: 'none' }}>
            <Button variant="text" startIcon={<Icon/>} color={props.color || 'inherit'} className='navlink' size={props.size || 'medium'}>
                {text}
            </Button>
        </Link>
    )
}

export default NavLinkIcon
