import React, {useState, useEffect} from 'react'
import { TextField, Button, Box, Grid, Alert, Container } from '@mui/material';
import axios from 'axios';


function InfoPersonal(props) {
    const [form, setForm] = useState({
        city: '',
        postalCode: '',
        street: '',
        houseNumber: '',
    }) 

    const [error, setError] = useState()

    useEffect(() => {
        console.log(form)
    }, [form])

    function handleInputChange(event) {
        const { name, value } = event.target;
        setError()
        return setForm({ ...form, [name]: value });
    }

    async function handleFormSubmit() {
        if(!form.city || !form.postalCode || !form.street || !form.houseNumber) {
            setError('Please enter all required values *')
            return
        }

        const base_url = process.env.REACT_APP_API_BASE_URL
        const response = await axios.patch(base_url + '/user/' + props.user._id + '/update', {adressInfo: form})
        console.log(response.data)

        props.onStageSubmit()
    }

    return (
        <>
            <h1>This is SignUpStage 0</h1>

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
                        Submit
                        </Button>

                </Grid>
            </Grid>

        </>
    )
}

export default InfoPersonal
