import { Stepper, Step, StepLabel, Typography, Container, Button, Box, Divider, Paper } from '@mui/material';
import React, {useState, useEffect, useContext} from 'react'
import { useNavigate } from "react-router-dom";
import * as CONFIG from '../config/config'
import { UserContext } from "../context/UserContext";
import axios from 'axios';

import InfoPersonal from '../components/SignUpStages/InfoPersonal';
import InfoSnacks from '../components/SignUpStages/InfoSnacks';
import InfoPayment from '../components/SignUpStages/InfoPayment';
import InfoSubscription from '../components/SignUpStages/InfoSubscription';
import AdressInfo from '../components/AdressInfo'
import CheckOut from '../components/CheckOut';
import { CheckoutContext } from '../context/CheckoutContext';
const steps = ['Snacks', 'Plans', 'Adress'];

const emptyData = {
    signupStage: 10,
    adressInfo: {
        city: '',
        postalCode: '',
        street: '',
        houseNumber: '',
        additionalInfo: '',
    },
    snackInfo: {
        perDay: 'often',
        amountPeople: 1,
        sweet: true,
        salty: true,
        organic: true,
        vegan: false,
        vegetarian: false,
    },
    paymentInfo: {
        paypal: false,
        stripe: false,
    },
    subscriptions: []
}

function SignUpStages(props) {
    const navigation = useNavigate()
    const {user, setUser} = useContext(UserContext)
    const {checkoutItems, setCheckoutItems, total, setTotal} = useContext(CheckoutContext)
    
    const [activeStep, setActiveStep] = useState(() => {
        if(!user.signupStage) return 0;
        return user.signupStage 
    });

    async function handleFormSubmit(event, data) {
        const base_url = process.env.REACT_APP_API_BASE_URL
        const response = await axios.patch(base_url + '/user/' + user._id + '/update', data)
        setUser(response.data)
        getSubscriptionData()
        setActiveStep(data.signupStage)
        
        if(data.signupStage > 3) {
            navigation('/checkout')
        }
    }

    async function handleSkipClick() {
        const base_url = process.env.REACT_APP_API_BASE_URL
        const response = await axios.patch(base_url + '/user/' + user._id + '/update', emptyData)
        setActiveStep(10)
        setUser(response.data)
        navigation('/')
    }

    
    async function getSubscriptionData() {
        const base_url = process.env.REACT_APP_API_BASE_URL
        // populate subscription model for checkout
        const subsResponse = await axios.get(base_url + '/user/' + user._id + '/subscriptions')
        setTotal(subsResponse.data.total)
        setCheckoutItems(subsResponse.data.subscriptions)
    }

    return (
        <Container style={{marginTop: '100px'}}>
            <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};

                    return (
                        <Step key={label} {...stepProps}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            <Box component={Paper} sx={{width: '100%', borderRadius: '10px', padding: '1%', margin: '10px auto'}}>
                {
                    user.signupStage === 0 ? (
                        <Box sx={{maxWidth: '800px', margin: '10px auto'}}>
                            <InfoSnacks onFormSubmit={handleFormSubmit}/>
                        </Box>
                    ) : (<></>)
                }
                {
                    user.signupStage === 1 ? (
                        <Box sx={{maxWidth: '1000px', margin: '10px auto'}}>
                            <InfoSubscription onFormSubmit={handleFormSubmit}/>
                        </Box>
                    ) : (<></>)
                }
                {
                    user.signupStage === 2 ? (
                        <Box sx={{maxWidth: '800px', margin: '10px auto'}}>
                            <InfoPersonal onFormSubmit={handleFormSubmit}/>
                        </Box>
                    ) : (<></>)
                }
                {
                    user.signupStage === 3 ? (
                        <Box sx={{maxWidth: '800px', margin: '10px auto'}}>
                            <InfoPayment onFormSubmit={handleFormSubmit}/>
                        </Box>
                    ) : (<></>)
                }
                <Button onClick={handleSkipClick}>
                    Skip
                </Button>
            </Box>

            <CheckOut/>
        </Container>
    )
}

export default SignUpStages
