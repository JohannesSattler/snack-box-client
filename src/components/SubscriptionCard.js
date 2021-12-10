import React from 'react'
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
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';

import { Link } from 'react-router-dom';

function SubscriptionCard(props) {
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
                    <Grid container spacing={2}>
                        <Grid item xs={5}>
                            <Link to={'/subscriptions/' + _id} style={{textDecoration: 'none'}}>
                                <Button
                                variant="outlined"
                                style={{float: 'right', margin: '20px 0'}}
                                >
                                See more
                                </Button>
                            </Link>
                        </Grid>
                        <Grid item xs={5}>
                            <Typography variant="h5" align="left" color="text.secondary" sx={{mt: 0, p: 0}}>
                                {total} €
                            </Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Fab size="small" color="primary" aria-label="add">
                               {/*  <CheckIcon /> */}
                                <AddIcon/>
                            </Fab>
                        </Grid>
                    </Grid>
                </CardContent>
        </Card>
    )
}

export default SubscriptionCard
