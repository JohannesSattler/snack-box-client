import React from 'react'

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import { Link } from 'react-router-dom';

function ProductThumb(props) {
    const {_id, name, brand, image, sugars, salt, fat} = props.product
    console.log(props.product)
    return (
        <Card sx={{ width: 300, margin: '10px'}} variant="outlined">
                <CardMedia
                    component="img"
                    style={{objectFit: 'contain'}}
                    height="140"
                    image={image}
                    alt={name}
                />
                <Divider />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {brand}
                    </Typography>

                    <Stack 
                    direction="row" 
                    spacing={1}
                    style={{justifyContent: 'space-around', marginTop: 10}}
                    divider={<Divider orientation="vertical" flexItem />}
                    >
                        {sugars === 'low' ? (
                            <Chip label={'sugar'} color="success" variant="outlined" />
                        ) : sugars === 'moderate' ? (
                            <Chip label={'sugar'} color="primary" variant="outlined" />
                        ) : (
                            <Chip label={'sugar'} color="error" variant="outlined" />
                        )}

                        {salt === 'low' ? (
                            <Chip label={'salt'} color="success" variant="outlined" />
                        ) : salt === 'moderate' ? (
                            <Chip label={'salt'} color="primary" variant="outlined" />
                        ) : (
                            <Chip label={'salt'} color="error" variant="outlined" />
                        )}

                        {fat === 'low' ? (
                            <Chip label={'fat'} color="success" variant="outlined" />
                        ) : fat === 'moderate' ? (
                            <Chip label={'fat'} color="primary" variant="outlined" />
                        ) : (
                            <Chip label={'fat'} color="error" variant="outlined" />
                        )}
                    </Stack>

                <Link to={'/products/' + _id} style={{textDecoration: 'none'}}>
                    <Button
                    variant="outlined"
                    style={{float: 'right', margin: '4px 0'}}
                    >
                    See more
                    </Button>
                </Link>
                </CardContent>
        </Card>
    )
}

export default ProductThumb
