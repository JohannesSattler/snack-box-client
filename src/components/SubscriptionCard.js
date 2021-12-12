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
            const response = await axios.patch(`${base_url}/user/${user._id}/subscriptions/${_id}/add`)
            setUser(response.data)
        }
        else {
            const response = await axios.patch(`${base_url}/user/${user._id}/subscriptions/${_id}/remove`)
            setUser(response.data)
        }
    }

    return (
        <Card sx={{ width: 400, margin: '10px'}} raised={true}>
                <CardMedia
                    component="img"
                    style={{objectFit: 'contain'}}
                    height="140"
                    image={image}
                    alt={title}
                />
                <Divider />
                <CardContent>
                    <Typography gutterBottom noWrap={true} variant="h5" component="div">
                        {title}
                    </Typography>
                    <Divider />
                    <Typography variant="body2" color="text.secondary">
                        {description}
                    </Typography>
                    <Box style={{display: 'flex', justifyContent: "space-between", backgroundColor: 'white', height: '40px'}}>
                        <Box>
                            <Link to={'/subscriptions/' + _id} style={{textDecoration: 'none'}}>
                                <Button
                                variant="outlined"
                                style={{float: 'right', margin: '0px 0', height: '40px'}}
                                >
                                See more
                                </Button>
                            </Link>
                        </Box>
                        <Box style={{height: '40px'}}>
                            <Typography variant="h5" align="right" color="text.secondary" style={{height: '40px', width: '100%', fontSize: '2em'}} sx={{mt: 0, p: 0}}>
                                {total} €
                            </Typography>
                        </Box>
                        <Box>
                            <Fab 
                            size="small" 
                            color='primary'
                            style={{height: '40px', backgroundColor: isActive ? "#4caf50" : "#03a9f4"}} 
                            aria-label="add" 
                            onClick={handleAddRemoveClick}>
                               {
                                isActive ? (
                                    <CheckIcon />
                                ) : (
                                    <AddIcon/>
                                )
                               }
                            </Fab>
                        </Box>
                    </Box>
                </CardContent>
        </Card>
    )
}

export default SubscriptionCard
