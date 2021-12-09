import React, { useState } from "react";
import { signup } from "../services/auth";
import { useNavigate } from "react-router-dom";
import "./auth.css";
import * as PATHS from "../utils/paths";
import * as USER_HELPERS from "../utils/userToken";
import * as CONFIG from '../config/config'

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';

export default function Signup({ authenticate }) {
  const [form, setForm] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: ""
  });
  const { email, password, firstName, lastName } = form;
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  function handleInputChange(event) {
    const { name, value } = event.target;
    return setForm({ ...form, [name]: value });
  }

  function handleFormSubmission(event) {
    event.preventDefault();
    const credentials = {
      email,
      password,
      firstName,
      lastName,
    };

    signup(credentials).then((res) => {
      if (!res.status) {
        // unsuccessful signup
        console.error("Signup was unsuccessful: ", res.errorMessage);
        return setError({
          message: res.errorMessage,
        });
      }

      // successful signup
      USER_HELPERS.setUserToken(res.data.accessToken);
      authenticate(res.data.user);

      if(res.data.user && res.data.user.signupStage < CONFIG.MAX_SIGNUP_STAGE) {
        console.log(res.data.user.signupStage)
        const pageRoute = {
          0: 'personal-information',
          1: 'snack-information',
          2: 'payment-information',
          3: 'subscription-information'
        }
        console.log('On Start nav change')
        navigate('/signup/' + pageRoute[res.data.user.signupStage]);
      } 
      else {
        navigate(PATHS.HOMEPAGE);
      }
    });
  }

  return (
      <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'gray' }}>
            
          </Avatar>
          <Typography component="h2" variant="h5">
            Sign Up
          </Typography>
          <Box component="form" onSubmit={handleFormSubmission} noValidate sx={{ mt: 1 }}>
            <Box style={{display: 'flex'}}>
              <TextField
                margin="dense"
                required
                fullWidth
                id="firstName"
                label="First Name"
                name="firstName"
                autoComplete="firstName"
                onChange={handleInputChange}
                autoFocus
                style={{marginRight: 2}}
              />
              <TextField
                margin="dense"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lastName"
                onChange={handleInputChange}
                style={{marginLeft: 2}}
              />
            </Box>
            <TextField
              margin="dense"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
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
              Sign Up
            </Button>
            <Grid container>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Already have an account? Log In"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      </>
  );
}
