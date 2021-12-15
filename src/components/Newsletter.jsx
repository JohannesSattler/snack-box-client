import { Alert, Box, Button, Divider, Paper, TextField, Typography } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'

function Newsletter() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [error, setError] = useState("")

    async function handleJoinClick() {
        console.log('hello')

        try {
            const base_url = process.env.REACT_APP_API_BASE_URL
            const response = await axios.patch(base_url + '/newsletter/create-entry', {email, name})
            console.log(response)
        }
        catch {
            setError("Something went wrong! sorry")

        }
    }

    return (
        <Box component={Paper} sx={{ maxWidth: '600px', m: '10px auto', p: 3, borderRadius: '20px', backgroundColor: '#f7f7f7', filter: 'drop-shadow(0 0 5px gray)'}}>
            <Typography variant="h5" color="primary">Join the snack club. 😇</Typography>
            <Typography variant="subtitle1">Stay up to date with our latest snacks and products.</Typography>
            <Typography variant="subtitle2">We dont spam no worries! 🥰</Typography>
            <br/>
            <Divider/>
            <br/>
            <Box sx={{display: "flex"}}>
                <TextField
                    onChange={(e) => setName(e.target.value)}
                    size='small'
                    name="name"
                    label="Name"
                    sx={{m: 1}}
                />
                <TextField
                    onChange={(e) => setEmail(e.target.value)}
                    size='small'
                    name="name"
                    label="Email"
                    sx={{m: 1, width: '80%'}}
                />
                <Button 
                onClick={handleJoinClick}
                sx={{m: 1}} 
                variant="contained" 
                size="small" 
                color="success"
                >Join</Button>
                
            </Box>
                {
                    error && (
                        <Alert severity="error">{error}</Alert>
                    )
                }
        </Box>
    )
}

export default Newsletter
