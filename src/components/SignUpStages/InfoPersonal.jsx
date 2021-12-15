import React, {useState, useEffect, useContext} from 'react'
import { TextField, Button, Box, Grid, Alert, Container, Typography, InputAdornment, FormControl, InputLabel, Input, Divider, } from '@mui/material';
import axios from 'axios';
import { UserContext } from "../../context/UserContext";
import { AccountCircle, AddCircle, Badge, BadgeOutlined, EditRoad, House, LocationCity, MarkunreadMailbox } from '@mui/icons-material';
import { useNavigate } from "react-router-dom";
function InfoPersonal(props) {
    const navigation = useNavigate()
    const {user, setUser} = useContext(UserContext)
    
    const [form, setForm] = useState({
        firstName: user?.firstName,
        lastName: user?.lastName,
        city: user.adressInfo?.city,
        postalCode: user.adressInfo?.postalCode,
        street: user.adressInfo?.street,
        houseNumber: user.adressInfo?.houseNumber,
        additionalInfo: user.adressInfo?.additionalInfo
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
        
        if(props.showNameEdit) {
            props.onFormSubmit(e, {
                signupStage: 10, 
                firstName: form.firstName, 
                lastName: form.lastName,
                adressInfo: form
            })
        }
        else {
            props.onFormSubmit(e, {signupStage: 10, adressInfo: form})
        }
    }

    return (
        <>
            <Typography align="center" variant="body1" gutterBottom>
                Adress Information
            </Typography>
            <Grid container spacing={2}>
                {
                    props.showNameEdit && (
                        <>
                        <Grid item xs={12}>
                            <FormControl variant="standard" style={{margin: '10px'}} >
                                <InputLabel>
                                    First Name
                                </InputLabel>
                                <Input
                                defaultValue={user?.firstName}  
                                autoFocus 
                                onChange={handleInputChange} 
                                label="First Name" 
                                name="firstName"
                                startAdornment={
                                    <InputAdornment position="start">
                                        <Badge fontSize="medium"/>
                                    </InputAdornment>
                                }
                                />
                            </FormControl>
                            <FormControl variant="standard" style={{margin: '10px'}} >
                                <InputLabel>
                                    Last Name
                                </InputLabel>
                                <Input
                                defaultValue={user?.lastName} 
                                size='small' 
                                onChange={handleInputChange} 
                                label="Last Name" 
                                name="lastName"
                                startAdornment={
                                    <InputAdornment position="start">
                                        <BadgeOutlined fontSize="medium"/>
                                    </InputAdornment>
                                }
                                />
                            </FormControl>

                            <Divider/>  
                        </Grid>
                        </>
                    )
                }
                <Grid item xs={12}>
                    <FormControl variant="standard" style={{margin: '10px'}} >
                        <InputLabel>
                            City *
                        </InputLabel>
                        <Input
                        defaultValue={user.adressInfo?.city} 
                        size='small' 
                        autoFocus 
                        required 
                        onChange={handleInputChange} 
                        label="City" 
                        name="city"
                        startAdornment={
                            <InputAdornment position="start">
                                <LocationCity fontSize="medium"/>
                            </InputAdornment>
                        }
                        />
                    </FormControl>
                    <FormControl variant="standard" style={{margin: '10px'}} >
                        <InputLabel>
                            Postal code *
                        </InputLabel>
                        <Input
                        defaultValue={user.adressInfo?.postalCode} 
                        required 
                        onChange={handleInputChange} 
                        label="Postal code" 
                        name="postalCode"
                        startAdornment={
                            <InputAdornment position="start">
                                <MarkunreadMailbox fontSize="medium"/>
                            </InputAdornment>
                        }
                        />
                    </FormControl>

                </Grid>

                <Grid item xs={12}>
                    <FormControl variant="standard" style={{margin: '10px'}} >
                        <InputLabel>
                            Street *
                        </InputLabel>
                        <Input
                        defaultValue={user.adressInfo?.street}   
                        required 
                        onChange={handleInputChange} 
                        label="Street" 
                        name="street"
                        startAdornment={
                            <InputAdornment position="start">
                                <EditRoad fontSize="medium"/>
                            </InputAdornment>
                        }
                        />
                    </FormControl>

                    <FormControl variant="standard" style={{margin: '10px'}} >
                        <InputLabel>
                            House Number *
                        </InputLabel>
                        <Input
                        defaultValue={user.adressInfo?.houseNumber}  
                        required 
                        onChange={handleInputChange} 
                        label="House number" 
                        name="houseNumber"
                        startAdornment={
                            <InputAdornment position="start">
                                <House fontSize="medium"/>
                            </InputAdornment>
                        }
                        />
                    </FormControl>
                </Grid>

                <Grid item xs={12}>
                    <FormControl variant="standard">
                        <InputLabel>
                            Additional information
                        </InputLabel>
                        <Input
                        defaultValue={user.adressInfo?.additionalInfo}  
                        onChange={handleInputChange} 
                        multiline
                        maxRows={5}
                        label="Additional info" 
                        name="additionalInfo"
                        startAdornment={
                            <InputAdornment position="start">
                                <AddCircle fontSize="medium"/>
                            </InputAdornment>
                        }
                        />
                    </FormControl>
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
