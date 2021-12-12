import React, {useState, useEffect, useContext} from 'react'
import { Button, Alert, Container, Checkbox, FormControlLabel, Typography, Divider } from '@mui/material';
import axios from 'axios';
import { UserContext } from "../../context/UserContext";
import { useNavigate } from 'react-router';
import Loading from '../Loading/index'
import { Box } from '@mui/system';
import SubscriptionCard from '../SubscriptionCard';
import SubscriptionCardSmall from '../SubscriptionCardSmall';

function InfoSubscription(props) {
    const navigation = useNavigate()
    const {user, setUser} = useContext(UserContext)
    const [error, setError] = useState()
    const [form, setForm] = useState() 
    const [subscriptions, setSubscription] = useState()

    useEffect(() => {
        (async() => {
            const base_url = process.env.REACT_APP_API_BASE_URL
            const response = await axios.get(base_url + '/subscriptions/')
            setSubscription(response.data.splice(0, 3))
        })()
    }, [])
    
    function handleCheckBoxChange(event) {
        setError()
        return setForm({ ...form, [event.target.name]: event.target.checked })
    }

    async function handleFormSubmit(e) {
        props.onFormSubmit(e, {signupStage: 2})
    }

    if(!subscriptions) {
        return <Loading></Loading>
    }

    return (
        <Container maxWidth="xl">
            <Typography align="center" variant="h5" gutterBottom>
                Add a plan to your cart
            </Typography>
            <Divider/>
            <Box alignItems="center" alignSelf="center" display="flex" flexDirection="row">
                {
                    subscriptions.map(subscription => {
                        return (<SubscriptionCard key={subscription._id} subscription={subscription} />)
                    })
                }
            </Box>  

            <br/>
            {
                error ? (
                    <Alert style={{maxWidth: '500px', margin: '0 auto'}} variant="filled" severity="error">
                        {error}
                    </Alert>
                ) : (<></>)
            }
            <Divider/>
            <Button
            type="submit"
            variant="contained"
            onClick={handleFormSubmit}
            sx={{ mt: 1, mb: 2 }}
            >
            Next
            </Button>
    </Container>
    )
}

export default InfoSubscription
