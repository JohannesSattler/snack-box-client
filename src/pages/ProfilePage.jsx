import { 
    Container,
    Box,
    Stepper,
    Step,
    StepLabel, 
    Typography,
    StepContent,
    Button,
    Paper,
    Divider,
    Link,
} from '@mui/material'
import React, {useState, useEffect, useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import InfoPersonal from '../components/SignUpStages/InfoPersonal';
import InfoSnacks from '../components/SignUpStages/InfoSnacks';
import InfoPayment from '../components/SignUpStages/InfoPayment';
import AdressInfo from '../components/AdressInfo';
import SnackInfo from '../components/SnackInfo';
import axios from 'axios';
import './landingpage.css'

function ProfilePage() {
    const navigate = useNavigate()
    const [editStage, setEditStage] = useState(null)
    const {user, setUser} = useContext(UserContext)

    async function handleUserDelete() {
        const base_url = process.env.REACT_APP_API_BASE_URL
        const response = axios.delete(base_url + '/user/' + user._id + '/delete')
        console.log(response.data)
        setUser(null)
        navigate('/')
    }

    return (
        <Container maxWidth="lg" component={Paper} sx={{padding: '10px', backgroundColor: '#f7f7f7', filter: 'drop-shadow(0 0 5px gray)'}}>
            <br/>
            <br/>
            <Typography className='color-text' variant='h3'><b>Hey {user.firstName}, whats snacking?</b></Typography>
            <Typography variant='h5' color="GrayText">Here you can edit your profile 😇</Typography>
            <Divider/>
            <br/>
            {/** PEROSNAL INFO*/}
            <Box>
                <AdressInfo adress={user.adressInfo}/>
                <Divider/>
            </Box>

            <br/>
            {/** SNACK INFO*/}
            <Box >
                <SnackInfo/>
                <Divider/>
            </Box>
            <Button onClick={handleUserDelete} sx={{m: 3}} variant="outlined" color="warning">
                Delete Profile
            </Button>
        </Container>
    )
}

export default ProfilePage
