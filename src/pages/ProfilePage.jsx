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

function ProfilePage() {
    const [editStage, setEditStage] = useState(null)
    const {user, setUser} = useContext(UserContext)

    return (
        <Container maxWidth="lg" style={{backgroundColor: 'white'}}>

            <Typography variant='h4'>Hey {user.firstName}, how are you?</Typography>
            <Typography variant='subtitle1'>Here you can edit your profile</Typography>
            <br/>
            {/** PEROSNAL INFO*/}
            <Box >
                <Typography variant='subtitle1'>Adress Info:</Typography>
                <Typography variant='body1'><b>City / Zip: </b>{user.adressInfo.city}, {user.adressInfo.postalCode}</Typography>
                <Typography variant='body2'><b>Street / house number: </b>{user.adressInfo.street} {user.adressInfo.houseNumber}</Typography>
                <Typography variant='body2'><b>Other: </b>{user.adressInfo.additionalInfo}</Typography>
                <Button onClick={() => editStage === 0 ? setEditStage(null) : setEditStage(0)}>
                    {editStage === 0 ? 'Close' : 'Edit'}
                </Button>
                {editStage === 0 ? (<><Divider/><InfoPersonal></InfoPersonal></>) : (<></>)}
                <Divider/>
            </Box>

            <br/>
            {/** SNACK INFO*/}
            <Box >
                <Typography variant='subtitle1'>Snack Info:</Typography>
                <Typography variant='body1'><b>PerDay: </b>{user.snackInfo.perDay}</Typography>
                <Typography variant='body2'><b>Amount of People: </b>{user.snackInfo.amountPeople}</Typography>
                <Typography variant='body2'><b>Sweet: </b>{user.snackInfo.sweet ? '✅' : '❌'}</Typography>
                <Typography variant='body2'><b>Salty: </b>{user.snackInfo.salty ? '✅' : '❌'}</Typography>
                <Typography variant='body2'><b>Organic: </b>{user.snackInfo.organic ? '✅' : '❌'}</Typography>
                <Typography variant='body2'><b>Vegan: </b>{user.snackInfo.vegan ? '✅' : '❌'}</Typography>
                <Typography variant='body2'><b>Vegatarian: </b>{user.snackInfo.vegetarian ? '✅' : '❌'}</Typography>
                <Button onClick={() => editStage === 1 ? setEditStage(null) : setEditStage(1)}>
                    {editStage === 1 ? 'Close' : 'Edit'}
                </Button>
                {editStage === 1 ? (<><Divider/><InfoSnacks></InfoSnacks></>) : (<></>)}
                <Divider/>
            </Box>

            <Box >
                <Typography variant='subtitle1'>Payment:</Typography>
                <Typography variant='body2'><b>Paypal: </b>{user.paymentInfo.paypal ? '✅' : '❌'}</Typography>
                <Typography variant='body2'><b>Stripe: </b>{user.paymentInfo.stripe ? '✅' : '❌'}</Typography>
                <Button onClick={() => editStage === 2 ? setEditStage(null) : setEditStage(2)}>
                    {editStage === 2 ? 'Close' : 'Edit'}
                </Button>
                {editStage === 2 ? (<><Divider/><InfoPayment></InfoPayment></>) : (<></>)}
                <Divider/>
            </Box>

        </Container>
    )
}

export default ProfilePage
