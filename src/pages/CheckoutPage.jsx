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
import { Link, useNavigate } from 'react-router-dom';
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
    const navigate = useNavigate()
    const {user, setUser} = useContext(UserContext)
    const {checkoutItems, setCheckoutItems} = useContext(CheckoutContext)

    async function handlePaymentAprroved(e)  {
        const orderArray = []

        checkoutItems.forEach(async item => {
            const newOrder = {
                user: user._id,
                subscription: item._id,
                status: {
                    orderReceived: {
                        label: 'We have received your Order.',
                        date: new Date(),
                        additionalInfo: '',
                        current: true
                    },
                    packBox: {
                      label: 'We just packed your box!',
                      date: new Date(),
                      additionalInfo: '',
                      current: false
                    },
                    orderOnWay: {
                      label: 'Snacks are on the way!',
                      date: new Date(),
                      additionalInfo: '',
                      current: false,
                      trackingLink: ''
                    },
                    arrived: {
                      label: 'Oh man start snacking!',
                      date: new Date(),
                      additionalInfo: '',
                      current: false
                    }
                  }
            }
            orderArray.push(newOrder)
        })


        const base_url = process.env.REACT_APP_API_BASE_URL
        const response = await axios.patch(base_url + '/user/' + user._id + '/orders/add', orderArray)
        console.log(response)
        setCheckoutItems(null)
        navigate('/orders')
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
