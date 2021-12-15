import { CardMedia, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

function PictureItem(props) {
    const {image, header, text} = props
    
    return (
        <Box style={{width: '300px', height: '200px', borderRadius: '20px', padding: '20px', margin: '0px auto', backgroundColor: '#f7f7f7', filter: 'drop-shadow(0 0 5px gray)'}}>
           <CardMedia
               component='img'
               src={image}
               style={{objectFit: 'contain'}}
               height="100px"
           />
           <Typography align='center' color="GrayText" variant="h5" ><strong>{header}</strong></Typography>
           <Typography align='center' color="GrayText" variant="subtitle1">{text}</Typography>
        </Box>
    )
}

export default PictureItem
