import { Container, Divider, Paper, Typography } from '@mui/material'
import axios from 'axios'
import React, {useContext, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { UserContext } from '../context/UserContext'

function NewsLetter() {
    const params = useParams()
    const { user, setUser } = useContext(UserContext)
    const navigation = useNavigate()

    useEffect(() => {
        (async() => {
            const base_url = process.env.REACT_APP_API_BASE_URL
            const response = await axios.post(base_url + '/newsletter/delete', {email: params.email})
            setUser(response.data)
            navigation('/')
        })()
    }, [])

    return (
        <div>
            
        </div>
    )
}

export default NewsLetter
