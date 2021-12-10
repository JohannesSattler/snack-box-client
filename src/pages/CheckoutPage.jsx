import { 
    Container,
    Box,
    Stepper,
    Step,
    StepLabel, 
    Typography,
    StepContent,
    Button,
    Paper,
    Divider,
} from '@mui/material'
import { Link } from 'react-router-dom';
import React, {useState, useEffect, useContext} from 'react'
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import Loading from '../components/Loading/index'
import SubscriptionCard from '../components/SubscriptionCard';

function CheckoutPage() {
    const [subscription, setSubscription] = useState(null)
    const {user, setUser} = useContext(UserContext)

    useEffect(() => {
        (async() => {
            // CHANGE that to the current subscription model the user has defined
            const someID = '61b1d9ad5e7350d8f9564ecb'
            // get the current subscription model
            const base_url = process.env.REACT_APP_API_BASE_URL
            const response = await axios.get(base_url + '/subscriptions/' + someID)
            console.log(response.data)
            setSubscription(response.data)
        })()
    }, [])

    if(!subscription) {
        return <Loading></Loading>
    }

    return (
        <Container maxWidth="lg" style={{backgroundColor: 'white'}}>
            <Typography align="center" variant="h3">Checkout</Typography>
            <Box sx={{ maxWidth: 400, margin: '0 auto'}}>
                <Typography align="center" variant="h6">Shipping Information</Typography>
                <Typography variant='subtitle1'>Adress Info:</Typography>
                <Typography variant='body1'><b>City / Zip: </b>{user.adressInfo.city}, {user.adressInfo.postalCode}</Typography>
                <Typography variant='body2'><b>Street / house number: </b>{user.adressInfo.street} {user.adressInfo.houseNumber}</Typography>
                <Typography variant='body2'><b>Other: </b>{user.adressInfo.additionalInfo}</Typography>
                
                <Link to="/profile" >
                    <Button>
                        Edit
                    </Button>
                </Link>
                <Divider/>

                <SubscriptionCard subscription={subscription}/>
                <Typography variant='body2'><b>Total: </b>{subscription.total} €</Typography>
                <Divider/>
            </Box>

        </Container>
    )
}

export default CheckoutPage
