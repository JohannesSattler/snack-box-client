import { Alert, Box, Button, CardMedia, Divider, Paper, TextField, Typography } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import '../pages/landingpage.css'

function Newsletter() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [error, setError] = useState("")
    const [approved, setApproved] = useState("")

    async function handleJoinClick() {
        console.log('hello')

        try {
            const base_url = process.env.REACT_APP_API_BASE_URL
            const response = await axios.patch(base_url + '/newsletter/create-entry', {email, name})
            console.log(response)
            setApproved("Thanks for signing up for the newsletter!")
            setError("")
        }
        catch {
            setApproved("")
            setError("Something went wrong! sorry")
        }
    }

    return (
        <Box component={Paper} sx={{ maxWidth: '600px', m: '10px auto', p: 3, borderRadius: '20px', backgroundColor: '#f7f7f7', filter: 'drop-shadow(0 0 5px gray)'}}>
            
            <CardMedia
              component="img"
              style={{objectFit: 'contain', position: 'absolute', top: '-50px', backgroundColor: '#f7f7f7', width: '80px', left: '50px', borderRadius: '100px', padding: '10px', marginBottom: '40px'}}
              height="80"
              image={'/snackbox_logo.png'}
              alt="snackbox logo"
            />
            <br/>
            <Typography variant="h4" className="color-text"><b>Join the snack club.</b></Typography>
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
                {
                    approved && (
                        <Alert severity="success">{approved}</Alert>
                    )
                }
        </Box>
    )
}

export default Newsletter
