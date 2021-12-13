import React, {useState, useEffect, useContext} from 'react'
import { Button, Alert, Container, Checkbox, FormControlLabel, Divider } from '@mui/material';
import axios from 'axios';
import { UserContext } from "../../context/UserContext";
import { useNavigate } from 'react-router';
import Paypal from '../Paypal';
import Stripe from '../Stripe';

function InfoPayment(props) {
    const navigation = useNavigate()
    const {user, setUser} = useContext(UserContext)
    const [error, setError] = useState()
    const [form, setForm] = useState({
        paypal: false,
        stripe: false,
    }) 

    function handleCheckBoxChange(event) {
        setError()
        return setForm({ ...form, [event.target.name]: event.target.checked })
    }

    async function handleFormSubmit(e) {
        if(!form.paypal && !form.stripe) {
            setError('Please select atleast one payment option!')
            return
        }

        props.onFormSubmit(e, {paymentInfo: form, signupStage: 10})
        navigation('/')
    }

    return (
        <Container maxWidth="xl">
                <br/>
                <Stripe/>
                <Divider/>
                <br/>
                <Paypal/>
                <br/>
                <Divider/>
        </Container>
    )
}

export default InfoPayment
