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

function ProductCard(props) {
    const {_id, name, brand, image, sugars, salt, fat, price} = props.product

    return (
        <Card sx={{ width: 300, margin: '10px'}} raised={true}>
            <CardMedia
                component="img"
                style={{objectFit: 'contain'}}
                height="140"
                image={image}
                alt={name}
            />
            <Divider />
            <CardContent>
                <Typography gutterBottom noWrap={true} variant="h5" component="div">
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

                <Divider style={{margin: '5px 0'}}/>
                <Link to={'/products/' + _id} style={{textDecoration: 'none'}}>
                    <Button
                    variant="outlined"
                    style={{float: 'right', margin: '5px 0'}}
                    >
                    See more
                    </Button>
                </Link>
                <Typography variant="h5" align="left" color="text.secondary" sx={{mt: 0, p: 0}}>
                    {price} ???
                </Typography>
            </CardContent>
        </Card>
    )
}

export default ProductCard
