import React, {useState, useEffect, useRef, useContext} from 'react'
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import { CheckoutContext } from '../context/CheckoutContext';
import { Alert, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Paypal(props) {
    const navigate = useNavigate()
    const [success, setSuccess] = useState(false);
    const [ErrorMessage, setErrorMessage] = useState("");
    const [orderID, setOrderID] = useState(false);

    const {user, setUser} = useContext(UserContext)
    const {checkoutItems} = useContext(CheckoutContext)

    //sb-h1lbp9020401@personal.example.com
    //Ch89+#f#
    const createOrder = (data, actions) => {
        const purchaseUnits = checkoutItems.map(item => {
            const plan = {
                reference_id: item._id,
                description: item.title,
                amount: {
                    currency_code: "EUR",
                    value: item.total,
                },
            }

            return plan
        })

        return actions.order
            .create({
            purchase_units: purchaseUnits,
            // not needed if a shipping address is actually needed
            application_context: {
                shipping_preference: "NO_SHIPPING",
            },
            })
            .then((orderID) => {
            setOrderID(orderID);
            return orderID;
            });
    };

    const onApprove = (data, actions) => {
        return actions.order.capture().then(async function (details) {
            const { payer } = details;
            console.log(payer)

            const base_url = process.env.REACT_APP_API_BASE_URL
            const response = await axios.patch(base_url + '/user/' + user._id + '/update', {paymentInfo: {paypal: payer}})
            setUser(response.data)
            setSuccess(true);
            props.onApprove()
        });
    };

    const onError = (data, actions) => {
        setErrorMessage("An Error occured with your payment ");
    };


    console.log(process.env.REACT_APP_PAYPAL_CLIENT_ID)
    const initialOptions = {
        "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID,
        currency: "EUR",
        intent: "capture",
    };
    const style = {
        layout: "horizontal", 
        color: 'blue', 
        shape: 'pill', 
        height: 40,
        tagline: false, 
    }

    return (
        <Box sx={{m: 3, maxWidth: '500px', margin: '0 auto'}}>
            <PayPalScriptProvider options={initialOptions}>
            <PayPalButtons createOrder={createOrder} onApprove={onApprove} style={style} />

            {ErrorMessage && (
                <Alert severity="error">{ErrorMessage}</Alert>
            )}
        </PayPalScriptProvider>
        </Box>
    )
}

export default Paypal
