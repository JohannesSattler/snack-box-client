import React, {useState, useEffect, useContext} from 'react'
import { TextField, Button, Box, Grid, Alert, Container } from '@mui/material';
import axios from 'axios';
import { UserContext } from "../../context/UserContext";

function InfoPersonal(props) {
    const {user, setUser} = useContext(UserContext)

    const [form, setForm] = useState({
        city: '',
        postalCode: '',
        street: '',
        houseNumber: '',
    }) 

    const [error, setError] = useState()

    function handleInputChange(event) {
        const { name, value } = event.target;
        setError()
        return setForm({ ...form, [name]: value });
    }

    async function handleFormSubmit(e) {
        if(!form.city || !form.postalCode || !form.street || !form.houseNumber) {
            setError('Please enter all required values *')
            return
        }

        props.onFormSubmit(e, {signupStage: 1, adressInfo: form})
    }

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField style={{margin: '10px'}} required onChange={handleInputChange} label="City" name="city"/>
                    <TextField style={{margin: '10px'}} required onChange={handleInputChange} label="Postal code" name="postalCode"/>
                </Grid>
                <Grid item xs={12}>
                    <TextField style={{margin: '10px'}} required onChange={handleInputChange} label="Street" name="street"/>
                    <TextField style={{margin: '10px'}} required onChange={handleInputChange} label="House number" name="houseNumber"/>
                </Grid>
                <Grid item xs={12}>
                    <TextField onChange={handleInputChange} label="Additional info" name="additionalInfo"/>
                </Grid>
                <Grid item xs={12}>
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

                </Grid>
            </Grid>

        </>
    )
}

export default InfoPersonal
