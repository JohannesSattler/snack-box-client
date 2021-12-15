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
import InfoSnacks from './SignUpStages/InfoSnacks';

function SnackInfo() {
    const {user, setUser} = useContext(UserContext)
    const [toggleEdit, setToggleEdit] = useState(false)
    
    async function handleEditSubmit(data) {
        delete data.signupStage
        const base_url = process.env.REACT_APP_API_BASE_URL
        const response = await axios.patch(base_url + '/user/' + user._id + '/update', data)
        setUser(response.data)
    }

    return (
        <Box>
            <Typography color="primary" align="left" variant="h6">Snacks</Typography>
            <Card className="border-gradiant" style={{maxWidth: '100%', borderRadius: '5px', padding: '10px 10px', margin: '0px auto'}}>
                <Grid container sx={{p: 1, px: 2}}>
                    <Grid item xs={3}>
                        <Typography align="left" id="input-slider" gutterBottom>
                            Snacks per day
                        </Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <Typography align="left" id="input-slider" gutterBottom>
                            <b>{user.snackInfo.perDay}</b>
                        </Typography>
                    </Grid>
                </Grid>
                <Divider/>
                <Grid container sx={{p: 1, px: 2}}>
                    <Grid item xs={3}>
                        <Typography align="left" id="input-slider" gutterBottom>
                            Snack partners
                        </Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <Typography align="left" id="input-slider" gutterBottom>
                            <b>{user.snackInfo.amountPeople}</b>
                        </Typography>
                    </Grid>
                </Grid>
                <Divider/>
                <Grid container sx={{p: 1, px: 2}}>
                    <Grid item xs={3}>
                        <Typography align="left" id="input-slider" gutterBottom>
                            Type of snacks
                        </Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <Typography align="left" id="input-slider" gutterBottom>
                            <b>{user.snackInfo.sweet ? "sweet" : ""}{user.snackInfo.salty ? ", salty" : ""}{user.snackInfo.organic ? ", organic" : ""}</b>
                        </Typography>
                    </Grid>
                </Grid>
                <Divider/>
                <Grid container sx={{p: 1, px: 2}}>
                    <Grid item xs={3}>
                        <Typography align="left" id="input-slider" gutterBottom>
                            Vegan or vegetarian
                        </Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <Typography align="left" id="input-slider" gutterBottom>
                            <b>{user.snackInfo.vegan ? "vagan" : ""}{user.snackInfo.vegetarian ? ", vegetarian" : ""}</b>
                        </Typography>
                    </Grid>
                </Grid>
            </Card>
            <Typography align="right" sx={{mx: 2, my: 0}}>
                <Button onClick={() => setToggleEdit(!toggleEdit)} align="left" sx={{m: 3}} size='medium' variant='contained' color={toggleEdit ? 'warning' : 'primary'}>
                    {toggleEdit ? 'Hide Edit' : 'Edit Snacks'}
                </Button>
            </Typography>
            {
                toggleEdit && (
                    <Card className="border-gradiant-edit" style={{maxWidth: '100%', borderRadius: '5px', padding: '10px 0', margin: '0 auto', marginBottom: '20px'}}>
                        <InfoSnacks onFormSubmit={(e, data) => handleEditSubmit(data)}/>
                    </Card>
                )
            }
        </Box>
    )
}

export default SnackInfo
