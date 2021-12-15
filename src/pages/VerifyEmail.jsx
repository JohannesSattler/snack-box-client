import { Container, Divider, Paper, Typography } from '@mui/material'
import axios from 'axios'
import React, {useContext, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { UserContext } from '../context/UserContext'

function VerifyEmail(props) {
    const params = useParams()
    const { user, setUser } = useContext(UserContext)
    const navigation = useNavigate()

    useEffect(() => {
        (async() => {
            if(props.tryVerify) {
                const base_url = process.env.REACT_APP_API_BASE_URL
                const response = await axios.get(base_url + '/user/' + params.id + '/verify-email')
                setUser(response.data)
                navigation('/checkout')
            }
        })()
    }, [])

    return (
        <>
        <br/>
        <Container component={Paper} maxWidth="sm" sx={{padding: '10px', backgroundColor: '#f7f7f7', filter: 'drop-shadow(0 0 5px gray)'}}>
            <br/>
            <Typography variant='h4'>Please verify your Email 😇</Typography>
            <Divider/>
            <br/>
            <Typography align="left" variant='h6'>Hey {user.firstName}, 👋</Typography>
            <br/>
            <Typography align="left" variant='body1'>We just send you a Email, please check it out and click on verify!</Typography>
            <br/>
            <Typography align="left" variant='body1'>You can also just browse here but before making a purchase, make sure to verify it! 😇</Typography>
            <br/>
            <Typography align="left" variant='body1'>If you cant find this mail, check your <b>Spam Folder</b></Typography>
            <br/>
            <Typography align="left" variant='body1'><i>Best Regards, your SnackBox Team</i>🥰</Typography>
            <br/>
        </Container>
        </>
    )
}

export default VerifyEmail
