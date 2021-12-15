import { Alert, Box, Button, Container, Divider, Paper, TextField, Typography } from '@mui/material'
import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function AdminLogin() {
    const [form, setForm] = useState({
        username: "",
        password: "",
      });
    
      const { username, password } = form;
      const [error, setError] = useState(null);
      const navigate = useNavigate();
    
      function handleInputChange(event) {
        const { name, value} = event.target;
        return setForm({ ...form, [name]: value });
      }
    
      async function handleFormSubmission(event) {
        event.preventDefault();
        const credentials = {
          username,
          password,
        };

        try {
            const base_url = process.env.REACT_APP_API_BASE_URL
            const response = await axios.post(base_url + '/admin/login', credentials)
            console.log(response)
    
            if(response.data.errorMessage) {
                return setError(response.data.errorMessage)
            }
            
            if(response.data.message === "Admin is allowed!") {
                navigate('/admin/dashboard', { state: {superSecret: process.env.REACT_APP_ADMIN_SECRET}})
            }
        }
        catch(error) {
            setError(error)
        }
      }

    return (
        <Container component={Paper} maxWidth="sm" sx={{paddingTop: '10px', backgroundColor: '#f7f7f7', filter: 'drop-shadow(0 0 5px gray)'}}>
            <br/>
            <Typography className='color-text' variant='h3'><b>Super secret admin login!</b></Typography>
            <Typography variant='h5' color="GrayText">Please dont brute force 🤖</Typography>
            <Divider/>
            <br/>
            <Box component="form" onSubmit={handleFormSubmission} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              value={username}
              onChange={handleInputChange}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={password}
              onChange={handleInputChange}
              autoComplete="current-password"
            />
            {error && (
              <Alert severity="error">{error.message}</Alert>
            )}

{/*             <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me" style={{float: 'left'}}
            /> */}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 1, mb: 2 }}
            >
              Log In
            </Button>
            <Button onClick={() => navigate('/')} variant='text'>Not an Admin of this site? 🙈 Click this Button</Button>
            <br/>
            <br/>
          </Box>
        </Container>
    )
}

export default AdminLogin
