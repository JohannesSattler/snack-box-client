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
import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../context/UserContext'

const headerTextStyle = {fontSize: '0.8rem', opacity: '0.8'}

function AdressInfo(props) {
    const {user} = useContext(UserContext)
    const {city, postalCode, street, houseNumber} = props.adress

    return (
        <Card raised sx={{maxWidth: '400px', border: '1px solid gray', borderRadius: '10px', padding: '10px', margin: '20px 5px'}}>
            <Typography color="primary" align="left" variant="subtitle1">Adress</Typography>
                <Grid container spacing={0}>
                    <Grid xs={6}>
                        <Typography align="left" variant='body2' style={headerTextStyle}><b><i>Fullname</i></b></Typography>
                        <Typography align="left" variant='body2'>{user.firstName}, {user.lastName}</Typography>
                    </Grid>
                    <Grid xs={6}>
                        <Typography align="left" variant='body2' style={headerTextStyle}><b><i>City / Postal Code</i></b></Typography>
                        <Typography align="left" variant='body2'>{city}, {postalCode}</Typography>
                    </Grid>
                    <Grid xs={6}>
                        <Typography align="left" variant='body2' style={headerTextStyle}><b><i>Street / house number</i></b></Typography>
                        <Typography align="left" variant='body2'>{street}, {houseNumber}</Typography>
                    </Grid>
                    <Grid xs={6}>
                        <Typography align="left" variant='body2' style={headerTextStyle}><b><i>Additional Info</i></b></Typography>
                        <Typography align="left" variant='body2'>{props.adress.additionalInfo}</Typography>
                    </Grid>
                </Grid>

                <Typography align="right">
                    <Button align="left" size='small' variant='text' color="success">
                        Edit
                    </Button>
                    <Button align="right" size='small' variant='text' color="error">
                        Remove
                    </Button>

                </Typography>
        </Card>
    )
}

export default AdressInfo
