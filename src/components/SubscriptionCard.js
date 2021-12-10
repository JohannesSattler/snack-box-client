import React, {useState, useContext, useEffect} from 'react'
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
import { UserContext } from '../context/UserContext'
import axios from 'axios';

function SubscriptionCard(props) {
    const [isActive, setIsActive] = useState(false)
    const {user, setUser} = useContext(UserContext)
    const {_id, title, description, image, products } = props.subscription
    
    
    // check the total amount
    // THIS NEEDS TO BE DONE ON SERVER SIDE
    // after a subscription gets created or updated
    let total = 0
    if(products.length) {
        total = products.reduce((total, current) => total + current.price, 0)
        total = Number(total.toFixed(2))
        console.count(total)
    }

    useEffect(() => {
        // check on start if already subscribed
        if(user.subscriptions.includes(_id)) {
            setIsActive(true)
        }  
    }, [])

    // handle adding and removing subscriptions
    async function handleAddRemoveClick() {
        setIsActive(!isActive)

        const base_url = process.env.REACT_APP_API_BASE_URL
        if(!isActive) {
            console.log('Add')
            const response = await axios.patch(`${base_url}/user/${user._id}/subscriptions/${_id}/add`)
            console.log(response.data)
            setUser(response.data)
        }
        else {
            console.log('Remove')
            const response = await axios.patch(`${base_url}/user/${user._id}/subscriptions/${_id}/remove`)
            console.log(response.data)
            setUser(response.data)
        }
    }

    return (
        <Card sx={{ width: 300, margin: '10px'}} raised={true}>
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
                            <Fab size="small" color={isActive ? "secondary" : "primary"} aria-label="add" onClick={handleAddRemoveClick}>
                               {
                                isActive ? (
                                    <CheckIcon />
                                ) : (
                                    <AddIcon/>
                                )
                               }
                            </Fab>
                        </Grid>
                    </Grid>
                </CardContent>
        </Card>
    )
}

export default SubscriptionCard
