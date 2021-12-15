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

import { CircleTwoTone, Badge } from "@mui/icons-material";

export default function Signup({ authenticate }) {
  const [form, setForm] = useState({
    email: "",
    password: "",
    passwordReEnter: "",
    firstName: "",
    lastName: ""
  });
  const { email, password, passwordReEnter, firstName, lastName } = form;
  const [error, setError] = useState(null);

  const [errorFirstName, setErrorFirstName] = useState("")
  const [errorLastName, setErrorLastName] = useState("")
  const [errorEmail, setErrorEmail] = useState("")
  const [errorPassword, setErrorPassword] = useState("")
  const [errorPasswordReEnter, setErrorPasswordReEnter] = useState("")

  const navigate = useNavigate();

  function handleInputChange(event) {
    setErrorFirstName("")
    setErrorLastName("")
    setErrorEmail("")
    setErrorPassword("")
    setErrorPasswordReEnter("")
    setError("")
    const { name, value } = event.target;
    return setForm({ ...form, [name]: value });
  }

  function handleFormSubmission(event) {
    event.preventDefault();
    const credentials = {
      email,
      password,
      passwordReEnter,
      firstName,
      lastName,
    };

    signup(credentials).then((res) => {
      if (!res.status) {
        // unsuccessful signup
        console.error("Signup was unsuccessful: ", res.errorMessage);

        const {errorMessage: {message, type} } = res

        if(type === 'firstName') {
          return setErrorFirstName(message)
        }
        else if(type === 'lastName') {
          return setErrorLastName(message)
        }
        else if(type === 'email') {
          return setErrorEmail(message)
        }
        else if(type === 'password') {
          return setErrorPassword(message)
        }
        else if(type === 'passwordReEnter') {
          return setErrorPasswordReEnter(message)
        }

        return setError({
          message: res.errorMessage.message,
        });
      }

      // successful signup
      USER_HELPERS.setUserToken(res.data.accessToken);
      authenticate(res.data.user);

      if(res.data.user && res.data.user.signupStage < CONFIG.MAX_SIGNUP_STAGE) {
        navigate('/signup/signup-information');
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
                error={errorFirstName}
                helperText={errorFirstName}
                margin="dense"
                required
                fullWidth
                id="firstName"
                label="First Name"
                name="firstName"
                autoComplete="firstName"
                variant="standard"
                onChange={handleInputChange}
                autoFocus
                style={{marginRight: 2}}
                InputProps={{
                  startAdornment: <Badge fontSize="small" color="action" sx={{mr: 1}}/>
                }}
              />
              <TextField
                error={errorLastName}
                helperText={errorLastName}
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
              error={errorEmail}
              helperText={errorEmail}
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
              error={errorPassword}
              helperText={errorPassword}
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

            <TextField
              error={errorPasswordReEnter}
              helperText={errorPasswordReEnter}
              margin="dense"
              required
              fullWidth
              name="passwordReEnter"
              label="Retype password"
              type="password"
              id="passwordReEnter"
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
