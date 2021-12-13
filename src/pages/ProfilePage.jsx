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
import { UserContext } from '../context/UserContext';
import InfoPersonal from '../components/SignUpStages/InfoPersonal';
import InfoSnacks from '../components/SignUpStages/InfoSnacks';
import InfoPayment from '../components/SignUpStages/InfoPayment';
import AdressInfo from '../components/AdressInfo';
import SnackInfo from '../components/SnackInfo';

function ProfilePage() {
    const [editStage, setEditStage] = useState(null)
    const {user, setUser} = useContext(UserContext)

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
        </Container>
    )
}

export default ProfilePage
