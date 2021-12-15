import { Stepper, Step, StepLabel, Typography, Container, Button, Box, Divider, Paper } from '@mui/material';
import React, {useState, useEffect, useContext} from 'react'
import { useNavigate } from "react-router-dom";
import * as CONFIG from '../config/config'
import { UserContext } from "../context/UserContext";
import axios from 'axios';

import { CheckoutContext } from '../context/CheckoutContext';
function CheckOut() {
    const {user, setUser} = useContext(UserContext)
    const {checkoutItems, setCheckoutItems, total, setTotal} = useContext(CheckoutContext)

    useEffect(() => {
        (async() => {
            getSubscriptionData()
        })()
    }, [])

    async function getSubscriptionData() {
        const base_url = process.env.REACT_APP_API_BASE_URL
        // populate subscription model for checkout
        const subsResponse = await axios.get(base_url + '/user/' + user._id + '/subscriptions')
        setTotal(subsResponse.data.total)
        setCheckoutItems(subsResponse.data.subscriptions)
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

    if(!checkoutItems) return null

    return (
        <Box className="border-gradiant" component={Paper} sx={{minWidth: '100%', backgroundColor: '#fff', borderRadius: '10px', padding: '1%', margin: '10px auto', opacity: '0.9'}}>
                <Box sx={{maxWidth: '600px', margin: '10px auto'}}>
                    <Typography variant='h5'>Order Summary</Typography>
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
                        checkoutItems && (
                            <>
                                {
                                    checkoutItems.map((sub, index) => {
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
                                <Typography align="right" variant='h5'>Total: {total}€</Typography>
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
    )
}

export default CheckOut
