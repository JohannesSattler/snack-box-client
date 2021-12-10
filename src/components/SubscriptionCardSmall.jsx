import {
    Card,
    CardContent,
    CardMedia,
    Button,
    Typography,
    Divider,
    Fab,
    Box,
    Container,
    Grid,
} from '@mui/material'
import React, {useState, useContext, useEffect} from 'react'
import { Link } from 'react-router-dom';

function SubscriptionCardSmall(props) {
    const {_id, title, description, image, products } = props.subscription

    return (
        <Card sx={{margin: '5px'}} variant="outlined" raised={true}>
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <CardMedia
                    component="img"
                    height="40"
                    image={image}
                    alt="green iguana"
                    />
                </Grid>
                <Grid item xs={6}>
                    <Typography noWrap={true} variant="h5" align="left" color="text.secondary" sx={{mt: 0, p: 0}}>
                        {title}
                    </Typography>
                </Grid>
                <Grid item xs={3}>
                    <Link to={'/subscriptions/' + _id} style={{textDecoration: 'none'}}>
                        <Button
                        variant="outlined"
                        style={{float: 'right', margin: '0px 0'}}
                        >
                        See more
                        </Button>
                    </Link>
                </Grid>
            </Grid>
        </Card>
    )
}

export default SubscriptionCardSmall
