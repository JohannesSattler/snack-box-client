
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
    CardMedia,
} from '@mui/material'
import React, {useState, useEffect, useContext} from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import Loading from '../components/Loading/index'
import SubscriptionCard from '../components/SubscriptionCard';
import SubscriptionCardSmall from '../components/SubscriptionCardSmall';
import Order from '../components/Order';

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
    const [orders, setOrders] = useState(null)
    const {user, setUser} = useContext(UserContext)
    
    useEffect(() => {
        (async() => {
            // CHANGE that to the current subscription model the user has defined
            const base_url = process.env.REACT_APP_API_BASE_URL
            const response = await axios.get(base_url + '/user/' + user._id + '/orders')
            console.log(response.data.orders)
            setOrders(response.data.orders)
        })()
    }, [])

    if(!orders) {
        return <Loading></Loading>
    }

    return (
        <Container maxWidth="lg" style={{backgroundColor: 'white'}}>
            <Typography align="center" variant="h3">Your Orders</Typography>
            {
                orders.map(order => {
                   return  <Order key={order._id} order={order} status={order.status} subscription={order.subscription}/>
                })
            }
        </Container>
    )
}

export default OrdersPage
