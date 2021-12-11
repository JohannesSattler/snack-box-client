import { Stepper, Step, StepLabel, Typography, Container, Button } from '@mui/material';
import React, {useState, useEffect, useContext} from 'react'
import { useNavigate } from "react-router-dom";
import * as CONFIG from '../config/config'
import { UserContext } from "../context/UserContext";
import axios from 'axios';

import InfoPersonal from '../components/SignUpStages/InfoPersonal';
import InfoSnacks from '../components/SignUpStages/InfoSnacks';
import InfoPayment from '../components/SignUpStages/InfoPayment';
import InfoSubscription from '../components/SignUpStages/InfoSubscription';


const steps = ['Personal Info', 'Snack Info', 'Payment Info', 'Subscription'];

function SignUpStages(props) {
    const navigation = useNavigate()
    const {user, setUser} = useContext(UserContext)
    const [activeStep, setActiveStep] = useState(() => {
        if(!user.signupStage) return 0;
        return user.signupStage 
    });

    async function handleFormSubmit(event, data) {
        const base_url = process.env.REACT_APP_API_BASE_URL
        const response = await axios.patch(base_url + '/user/' + user._id + '/update', data)
        console.log(response.data)

        setUser(response.data)
        setActiveStep(data.signupStage)
    }

    async function handleSkipClick() {
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
        
        const base_url = process.env.REACT_APP_API_BASE_URL
        const response = await axios.patch(base_url + '/user/' + user._id + '/update', emptyData)
        setActiveStep(10)
        setUser(response.data)
        navigation('/')
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
        {
            user.signupStage === 0 ? (
                <InfoPersonal onFormSubmit={handleFormSubmit}/>
            ) : (<></>)
        }
        {
            user.signupStage === 1 ? (
                <InfoSnacks onFormSubmit={handleFormSubmit}/>
            ) : (<></>)
        }
        {
            user.signupStage === 2 ? (
                <InfoPayment onFormSubmit={handleFormSubmit}/>
            ) : (<></>)
        }
        {
            user.signupStage === 3 ? (
                <InfoSubscription onFormSubmit={handleFormSubmit}/>
            ) : (<></>)
        }

        <Button onClick={handleSkipClick}>
            Skip
        </Button>
        </Container>
    )
}

export default SignUpStages
