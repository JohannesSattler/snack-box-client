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
    const {checkoutItems} = useContext(CheckoutContext)


    return (
        <Container maxWidth="lg" style={{backgroundColor: 'white'}}>
            <Typography align="center" variant="h3">Checkout</Typography>
            <Box sx={{ maxWidth: 900, margin: '0 auto'}}>
                <AdressInfo adress={user.adressInfo}/>
                <br/>
                <CheckOut/>
                <Divider/>
                <br/>
                <Stripe/>
                <Divider/>
                <br/>
                <Paypal/>
                <br/>
            </Box>
        </Container>
    )
}

export default CheckoutPage
