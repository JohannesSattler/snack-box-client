import React from 'react'

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { Link } from 'react-router-dom';

function SubscriptionCard(props) {
    console.log({props})
    const {_id, title, description, image, products } = props.subscription
    
    let total = 0
    if(products.length) {
        total = products.reduce((total, current) => total + current.price, 0)
        total = Number(total.toFixed(2))
    }

    return (
        <Card sx={{ width: 300, margin: '10px'}} variant="outlined">
                <CardMedia
                    component="img"
                    style={{objectFit: 'contain'}}
                    height="140"
                    image={image}
                    alt={title}
                />
                <Divider />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {title}
                    </Typography>
                    <Divider />
                    <Typography variant="body2" color="text.secondary">
                        {description}
                    </Typography>


                <Link to={'/subscriptions/' + _id} style={{textDecoration: 'none'}}>
                    <Button
                    variant="outlined"
                    style={{float: 'right', margin: '20px 0'}}
                    >
                    See more
                    </Button>
                </Link>
                <Typography variant="h5" align="left" color="text.secondary" sx={{mt: 0, p: 0}}>
                    {total} €
                </Typography>
                </CardContent>
        </Card>
    )
}

export default SubscriptionCard
