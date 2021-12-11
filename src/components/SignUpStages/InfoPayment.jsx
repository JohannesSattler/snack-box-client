import React, {useState, useEffect, useContext} from 'react'
import { Button, Alert, Container, Checkbox, FormControlLabel } from '@mui/material';
import axios from 'axios';
import { UserContext } from "../../context/UserContext";

function InfoPayment(props) {
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

        props.onFormSubmit(e, {paymentInfo: form, signupStage: 3})
    }

    return (
        <Container maxWidth="xl">
            <FormControlLabel
                control={
                    <Checkbox onChange={handleCheckBoxChange} name="paypal" />
                }
                label="paypal"
            />
            <FormControlLabel
                control={
                    <Checkbox onChange={handleCheckBoxChange} name="stripe" />
                }
                label="stripe"
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

export default InfoPayment
