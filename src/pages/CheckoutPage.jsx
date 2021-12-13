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
import CheckOut from '../components/CheckOut';
import Paypal from '../components/Paypal';
import Stripe from '../components/Stripe';


function CheckoutPage() {
    const {user, setUser} = useContext(UserContext)
    const {checkoutItems, setCheckoutItems} = useContext(CheckoutContext)

    async function handlePaymentAprroved(e)  {
        const orderArray = []

        checkoutItems.forEach(async item => {
            const newOrder = {
                user: user._id,
                subscription: item._id,
                status: {
                    packBox: {
                      date: new Date(),
                      additionalInfo: 'There is No Info here',
                      current: true
                    },
                    orderOnWay: {
                      date: new Date(),
                      additionalInfo: 'There is No Info here',
                      current: false,
                      trackingLink: 'There is No Info here'
                    },
                    arrived: {
                      date: new Date(),
                      additionalInfo: 'There is No Info here',
                      current: false
                    }
                  }
            }
            orderArray.push(newOrder)
        })


        const base_url = process.env.REACT_APP_API_BASE_URL
        const response = await axios.patch(base_url + '/user/' + user._id + '/orders/add', orderArray)
        console.log(response)
    }

    return (
        <Container maxWidth="lg" style={{backgroundColor: 'white'}}>
            <Typography align="center" variant="h3">Checkout</Typography>
            <Box sx={{ maxWidth: 900, margin: '0 auto'}}>
                <AdressInfo adress={user.adressInfo}/>
                <br/>
                <CheckOut/>
                <Divider/>
                <br/>
                <Stripe onApprove={handlePaymentAprroved}/>
                <Divider/>
                <br/>
                <Paypal onApprove={handlePaymentAprroved}/>
                <br/>
            </Box>
        </Container>
    )
}

export default CheckoutPage
