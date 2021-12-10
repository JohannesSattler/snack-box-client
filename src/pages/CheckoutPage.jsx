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
import SubscriptionCardSmall from '../components/SubscriptionCardSmall';
import AdressInfo from '../components/AdressInfo';

function CheckoutPage() {
    const [subscriptions, setSubscriptions] = useState(null)
    const [total, setTotal] = useState(0)
    const {user, setUser} = useContext(UserContext)

    useEffect(() => {
        (async() => {
            // get the current subscription model
            const base_url = process.env.REACT_APP_API_BASE_URL
            const response = await axios.get(base_url + '/user/' + user._id + '/subscriptions')
            console.log(response.data)
            setSubscriptions(response.data.subscriptions)
            setTotal(response.data.total)
        })()
    }, [])

    if(!subscriptions) {
        return <Loading></Loading>
    }

    return (
        <Container maxWidth="lg" style={{backgroundColor: 'white'}}>
            <Typography align="center" variant="h3">Checkout</Typography>
            <Box sx={{ maxWidth: 600, margin: '0 auto'}}>
                <AdressInfo adress={user.adressInfo}/>
                <Divider/>
                {
                    subscriptions.map(subscription => {
                        return <SubscriptionCardSmall subscription={subscription}/> 
                    })
                }
                <Divider/>
                <Typography variant='h4'><b>Total: </b>{total} €</Typography>
            </Box>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
        </Container>
    )
}

export default CheckoutPage
