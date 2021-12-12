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
import { CheckoutContext } from '../context/CheckoutContext';
import Loading from '../components/Loading/index'
import SubscriptionCard from '../components/SubscriptionCard';
import SubscriptionCardSmall from '../components/SubscriptionCardSmall';
import AdressInfo from '../components/AdressInfo';


function CheckoutPage() {
    const {user, setUser} = useContext(UserContext)
    const {checkoutItems, setCheckoutItems, total, setTotal} = useContext(CheckoutContext)

    useEffect(() => {
        (async() => {
            // get the current subscription model
            const base_url = process.env.REACT_APP_API_BASE_URL
            const response = await axios.get(base_url + '/user/' + user._id + '/subscriptions')
            setCheckoutItems(response.data.subscriptions)
            setTotal(response.data.total)
        })()
    }, [])

    if(!checkoutItems) {
        return <Loading></Loading>
    }

    return (
        <Container maxWidth="lg" style={{backgroundColor: 'white'}}>
            <Typography align="center" variant="h3">Checkout</Typography>
            <Box sx={{ maxWidth: 600, margin: '0 auto'}}>
                <AdressInfo adress={user.adressInfo}/>
                <Divider/>
                {
                    checkoutItems.map(subscription => {
                        return <SubscriptionCardSmall key={subscription._id} subscription={subscription}/> 
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
