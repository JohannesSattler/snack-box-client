
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
    Link,
} from '@mui/material'
import React, {useState, useEffect, useContext} from 'react'
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import Loading from '../components/Loading/index'
import SubscriptionCard from '../components/SubscriptionCard';
import SubscriptionCardSmall from '../components/SubscriptionCardSmall';

const steps = [
    {
      label: 'We pack your Box',
      date: '12.11.1994 11:00',
      description: `We just packed your box. We will send it to you as fast as possible. As soon as it is on the way you will get a tracking link.`,
    },
    {
        label: 'Your snacks are on the way!',
        date: '13.11.1994 11:00',
        description: `Snacks are coming to you! In 1-2 business day your box will arive. We provided the tracking link for you! `,
        trackingLink: 'https://github.com/JohannesSattler/snack-box'
    },
    {
        label: 'Snacks have arrived!',
        date: '15.11.1994 11:00',
        description: `Oh boi, Oh boi. Turn on Netflix and dont go outside anymore. Next snacks will arrive soon!`,
      },
];

function OrdersPage() {
    const [activeStep, setActiveStep] = useState(0);
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
            <Typography align="center" variant="h3">Your Orders</Typography>
            <Box sx={{ maxWidth: 400, margin: '0 auto'}}>
                <SubscriptionCardSmall subscription={subscription}/>
                <Stepper activeStep={activeStep} orientation="vertical">
                    {steps.map((step, index) => (
                        <Step key={step.label}>
                            <StepLabel>
                                <Typography variant="h5">{step.label}</Typography>
                                <Typography align="left" color="primary" variant="subtitle2"><i><b>{step.date}</b></i></Typography>
                            </StepLabel>
                            <StepContent>
                                <Divider/>
                                <Typography align="left" variant="body1">{step.description}</Typography>
                                {step.trackingLink ? 
                                    (
                                        <Typography align="left" variant="body1">
                                            <Link style={{left: 0}} variant="subtitle2" href={step.trackingLink} underline="hover">
                                                tracking link
                                            </Link>
                                        </Typography>
                                    )
                                : (<></>)
                                }
                            </StepContent>
                        </Step>
                    ))}
                </Stepper>
            </Box>
        </Container>
    )
}

export default OrdersPage
