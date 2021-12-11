import React, {useState, useEffect, useContext} from 'react'
import { Button, Alert, Container, Checkbox, FormControlLabel } from '@mui/material';
import axios from 'axios';
import { UserContext } from "../../context/UserContext";
import { useNavigate } from 'react-router';

function InfoSubscription(props) {
    const navigation = useNavigate()
    const {user, setUser} = useContext(UserContext)
    const [error, setError] = useState()
    const [form, setForm] = useState({
        someModel1: false,
        someModel2: false,
    }) 

    function handleCheckBoxChange(event) {
        setError()
        return setForm({ ...form, [event.target.name]: event.target.checked })
    }

    async function handleFormSubmit(e) {
        if(!form.someModel1 && !form.someModel2) {
            setError('Please select atleast one subscription model!')
            return
        }
        
        props.onFormSubmit(e, {subscriptions: ['61b1d9ad5e7350d8f9564ecb', '61b1d9ad5e7350d8f9564ecc'], signupStage: 10})
        navigation('/')
    }

    return (
        <Container maxWidth="xl">
        <FormControlLabel
            control={
                <Checkbox onChange={handleCheckBoxChange} name="someModel1" />
            }
            label="someModel1"
        />
        <FormControlLabel
            control={
                <Checkbox onChange={handleCheckBoxChange} name="someModel2" />
            }
            label="someModel2"
        />

        <br/>
        {
            error ? (
                <Alert style={{maxWidth: '500px', margin: '0 auto'}} variant="filled" severity="error">
                    {error}
                </Alert>
            ) : (<></>)
        }
        <Button
        type="submit"
        variant="contained"
        onClick={handleFormSubmit}
        sx={{ mt: 1, mb: 2 }}
        >
        Save
        </Button>

    </Container>
    )
}

export default InfoSubscription
