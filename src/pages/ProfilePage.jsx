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
        <Container maxWidth="lg" style={{backgroundColor: 'white'}}>
            <Typography variant='h4'>Hey {user.firstName}, how are you?</Typography>
            <Typography variant='subtitle1'>Here you can edit your profile</Typography>
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
            <Button onClick={handleUserDelete} sx={{m: 3}} variant="contained" color="error">
                Delete Profile
            </Button>
        </Container>
    )
}

export default ProfilePage
