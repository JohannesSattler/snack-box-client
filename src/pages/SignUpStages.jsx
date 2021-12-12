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

const steps = ['Snacks', 'Plans', 'Adress', 'Payment'];

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
    const [subscriptions, setSubscriptions] = useState()

    const [activeStep, setActiveStep] = useState(() => {
        if(!user.signupStage) return 0;
        return user.signupStage 
    });

    useEffect(() => {
        (async() => {
            getSubscriptionData()
        })()
    }, [])

    async function getSubscriptionData() {
        const base_url = process.env.REACT_APP_API_BASE_URL
        // populate subscription model for checkout
        const subsResponse = await axios.get(base_url + '/user/' + user._id + '/subscriptions')
        console.log(subsResponse.data)
        setSubscriptions(subsResponse.data)
    }

    async function handleFormSubmit(event, data) {
        const base_url = process.env.REACT_APP_API_BASE_URL
        const response = await axios.patch(base_url + '/user/' + user._id + '/update', data)
        await getSubscriptionData()
        setUser(response.data)
        setActiveStep(data.signupStage)
    }

    async function handleSkipClick() {
        const base_url = process.env.REACT_APP_API_BASE_URL
        const response = await axios.patch(base_url + '/user/' + user._id + '/update', emptyData)
        setActiveStep(10)
        setUser(response.data)
        navigation('/')
    }

    /**
     * https://codereview.stackexchange.com/a/173668
     * Returns the date of the next day. If today is friday and we are asking for next friday the friday of the next week is returned.
     * @param dayOfWeek 0:Su,1:Mo,2:Tu,3:We,4:Th,5:Fr,6:Sa
     */
     function getNextDayOfWeek(date, dayOfWeek) {
        var resultDate = new Date(date.getTime());
        resultDate.setDate(date.getDate() + (7 + dayOfWeek - date.getDay() - 1) % 7 +1);
        return resultDate.toLocaleDateString();
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
            <Box component={Paper} sx={{minWidth: '100%', backgroundColor: '#fafafa', borderRadius: '10px', padding: '1%', margin: '10px auto', border: '0px solid gray', opacity: '0.9'}}>
                <Box sx={{maxWidth: '600px', margin: '10px auto'}}>
                    <Typography variant='h4'>Order Summary</Typography>
                    <br/>
                    <Typography align="left" color="primary" variant='h6'>Adress</Typography>
                    <Divider/>
                    <Box display="flex" justifyContent="space-between">
                        <Typography variant='subtitle1'>Fullname</Typography>
                        <Typography variant='body1'><b>{user.firstName} {user.lastName}</b></Typography>
                    </Box>
                    {
                        user?.adressInfo && (
                            <>
                            <Box display="flex" justifyContent="space-between">
                                <Typography align="left" variant='subtitle1'>City / Postal code</Typography>
                                <Typography align="left" variant='body1'><b>{user.adressInfo.city}, {user.adressInfo.postalCode}</b></Typography>
                            </Box>
                            <Box display="flex" justifyContent="space-between">
                                <Typography align="left" variant='subtitle1'>Street / House number</Typography>
                                <Typography align="left" variant='body1'><b>{user.adressInfo.street}, {user.adressInfo.houseNumber}</b></Typography>
                            </Box>
                            <Box display="flex" justifyContent="space-between">
                                <Typography align="left" variant='subtitle1'>Special instructions</Typography>
                                <Typography align="left" variant='body1'><i>{user.adressInfo.additionalInfo}</i></Typography>
                            </Box>
                            </>
                        )
                    }
                    <Divider/>
                    <br/>
                    <Typography align="left" color="primary" variant='h6'>Subscription</Typography>
                    <Divider/>
                    {
                        subscriptions && (
                            <>
                                {
                                    subscriptions.subscriptions.map((sub, index) => {
                                        return (
                                            <Box key={sub._id} display="flex" justifyContent="space-between">
                                                <Typography variant='subtitle1'>{index+1}. {sub.title}</Typography>
                                                <Typography variant='body1'><b>{sub.total}€</b></Typography>
                                            </Box>
                                        )
                                    })
                                }
                                <Divider/>
                                <br/>
                                <Typography align="left" color="primary" variant='h6'>Summary</Typography>
                                <Divider/>
                                <Box display="flex" justifyContent="space-between">
                                    <Typography align="left" variant='subtitle1'>Delivery</Typography>
                                    <Typography variant='subtitle1'>9.99€</Typography>
                                </Box>
                                <Typography align="right" variant='h5'>Total: {subscriptions.total}€</Typography>
                                <Divider/>
                                <br/>
                                <Typography align="left" variant='h5' style={{fontSize: '1.2em'}}>You will get your Box every <b>Friday</b>. Next delivery is <b>{getNextDayOfWeek(new Date(), 5)}</b></Typography>
                                <br/>
                                <Typography align="left" variant='body1'><strong>* Please note that we need two working days to pack your box.</strong></Typography>
                                <Typography align="left" variant='body2'><i>You can always choose a different plan or unsubscribe to weekly snacks!</i></Typography>
                            </>
                        )
                    }
                </Box>
            </Box>
        </Container>
    )
}

export default SignUpStages
