import { Container, Divider, Paper } from '@mui/material'
import React from 'react'
import Paypal from './Paypal'
import Stripe from './Stripe'

function PaymentWrapper(props) {
    return (
        <Container className="border-gradiant" component={Paper} sx={{padding: '10px', backgroundColor: '#fff'}}>
                <Stripe onApprove={props.onPaymentAprroved}/>
                <Divider/>
                <br/>
                <Paypal onApprove={props.onPaymentAprroved}/>
                <br/>
        </Container>
    )
}

export default PaymentWrapper
