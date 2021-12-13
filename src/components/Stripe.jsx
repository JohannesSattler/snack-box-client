import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import axios from "axios";
import { Box } from "@mui/material";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

function Stripe(props) {
    const [clientSecret, setClientSecret] = useState("");

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        (async() => {
            const base_url = process.env.REACT_APP_API_BASE_URL
            // populate subscription model for checkout
            const payResponse = await axios.post(base_url + '/create-payment-intent', { items: [{ id: "xl-tshirt" }] })
            setClientSecret(payResponse.data.clientSecret)
            console.log(payResponse.data)
        })()
    }, []);

    const appearance = {
        theme: 'stripe',
    };
    const options = {
        clientSecret,
        appearance,
    };

    return (
        <Box sx={{m: 3, maxWidth: '500px', margin: '0 auto'}}> 
            {clientSecret && (
                <Elements options={options} stripe={stripePromise}>
                    <CheckoutForm onApprove={props.onApprove}/>
                </Elements>
            )}
        </Box>
    )
}

export default Stripe
