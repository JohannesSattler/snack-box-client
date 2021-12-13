import {
    Card,
    CardContent,
    CardMedia,
    Button,
    Typography,
    Divider,
    Fab,
    Box,
    Container,
    Grid,
} from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import React, {useContext, useState} from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import InfoPersonal from './SignUpStages/InfoPersonal';
import axios from 'axios';

const headerTextStyle = {fontSize: '0.8rem', opacity: '0.8'}

function AdressInfo(props) {
    const {user, setUser} = useContext(UserContext)
    const [toggleEdit, setToggleEdit] = useState(false)
    const {city, postalCode, street, houseNumber} = props.adress

    async function handleEditSubmit(data) {
        const base_url = process.env.REACT_APP_API_BASE_URL
        const newData = {firstName: data.firstName, lastName: data.lastName, adressInfo: data.adressInfo}
        const response = await axios.patch(base_url + '/user/' + user._id + '/update', newData)
        setUser(response.data)
    }

    return (
        <Box>
            <Typography color="primary" align="left" variant="h6">Delivery Adress</Typography>
            <Card style={{maxWidth: '100%', border: '2px dashed #4caf50', borderRadius: '5px', padding: '10px 0', margin: '0px auto'}}>
                <Grid container spacing={0.5}>
                    <Grid item xs={12}>
                        <Box display="flex" >
                            <CheckCircleIcon sx={{mx: 1, my: 0.3}} color="success"/>
                            <Typography align="left" variant='h6' color={'green'} ><strong>{user.firstName}, {user.lastName}</strong></Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sx={{mx: 5}}>
                        {/* <Typography align="left" variant='body2' style={headerTextStyle}><b><i>City / Postal Code</i></b></Typography> */}
                        <Typography align="left" variant='body1'>{city}, {postalCode}</Typography>
                    </Grid>
                    <Grid item xs={12} sx={{mx: 5}}>
                        {/* <Typography align="left" variant='body2' style={headerTextStyle}><b><i>Street / house number</i></b></Typography> */}
                        <Typography align="left" variant='body1'>{street}, {houseNumber}</Typography>
                    </Grid>
                    <Grid item xs={12} sx={{mx: 5}}>
                        <Divider/>
                        <Typography align="left" variant='subtitle2'><i>Additional Info</i></Typography>
                        <Typography align="left" variant='body2'><i>{props.adress.additionalInfo}</i></Typography>
                    </Grid>
                </Grid>
            </Card>
            <Typography align="right" sx={{mx: 2, my: 0}}>
                <Button onClick={() => setToggleEdit(!toggleEdit)} align="left" sx={{mx: 3}} size='medium' variant='text' color={toggleEdit ? 'warning' : 'primary'}>
                    {toggleEdit ? 'Hide' : 'Edit'}
                </Button>
            </Typography>
            {
                toggleEdit && (
                    <Card style={{maxWidth: '100%', border: '1px dashed gray', borderRadius: '5px', padding: '10px 0', margin: '0 auto', marginBottom: '20px'}}>
                        <InfoPersonal showNameEdit={true} onFormSubmit={(e, data) => handleEditSubmit(data)}/>
                    </Card>
                )
            }
        </Box>
    )
}

export default AdressInfo
