import React, {useEffect, useState} from 'react'
import Loading from '../components/Loading/index'
import SubscriptionCard from '../components/SubscriptionCard'
import axios from 'axios'
import { Container, Divider, Stack, Typography } from '@mui/material'

function SubscriptionPage() {
    const [subscriptions, setSubscriptions] = useState([])

    useEffect(() => {
        (async() => {
            const base = process.env.REACT_APP_API_BASE_URL
            const response = await axios.get(base + '/subscriptions')
            setSubscriptions(response.data)
        })()
    }, [])
    
    if(!subscriptions.length) {
        return <Loading></Loading>
    } 

    return (  
        <Container maxWidth="xl" sx={{padding: '10px', backgroundColor: '#f7f7f7', filter: 'drop-shadow(0 0 5px gray)'}}>
        <br/>
        <Typography className='color-text' align="center" variant="h3"><b>Our subscriptions</b></Typography>
        <Typography variant='h5' color="GrayText">Click on the "+" to add a subscription! 🙂</Typography>
        <Divider/>
        <Stack
        sx={{p: 5, m: '0 auto'}}
        direction="row"
        flexWrap="wrap"
        justifyContent="center"
        alignItems="center"
        divider={<Divider orientation="vertical" flexItem />}
        >
            {
                subscriptions.map(subscription => {
                    return <SubscriptionCard key={subscription._id} subscription={subscription}/>
                })
            }
        </Stack>
        </Container>
    )
}

export default SubscriptionPage
