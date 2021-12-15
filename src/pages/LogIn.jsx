import React, { useState } from "react";
import { login } from "../services/auth";
import { useNavigate } from "react-router-dom";
import "./Signup";
import './landingpage.css'
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
import { CardMedia, Divider, Paper } from "@mui/material";
import { 
  Badge, 
  BadgeOutlined, 
  Mail, 
  Https, } from '@mui/icons-material';

export default function LogIn({ authenticate }) {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { email, password } = form;
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  function handleInputChange(event) {
    const { name, value} = event.target;

    return setForm({ ...form, [name]: value });
  }

  function handleFormSubmission(event) {
    event.preventDefault();
    const credentials = {
      email,
      password,
    };

    login(credentials).then((res) => {
      if (!res.status) {
        return setError({ message: res.errorMessage });
      }
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

      //navigate(PATHS.HOMEPAGE);
    });
  }

  return (
      <Container component={Paper} maxWidth="sm" sx={{paddingTop: '10px', backgroundColor: '#f7f7f7', filter: 'drop-shadow(0 0 5px gray)'}}>
        <CssBaseline />
          <CardMedia
              component="img"
              style={{objectFit: 'contain', opacity: '1', marginTop: '10px'}}
              height="120"
              image={'/logo-big.png'}
              alt="snackbox logo"
          />
          <br/>
          <Typography variant="h4" color="GrayText"><b>Sign In</b></Typography>
          <Divider/>
          <Box component="form" onSubmit={handleFormSubmission} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={email}
              onChange={handleInputChange}
              autoFocus
              variant="standard"
                InputProps={{
                  startAdornment: <Mail fontSize="small" color="action" sx={{mr: 1}}/>
              }}
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
              variant="standard"
                InputProps={{
                  startAdornment: <Https fontSize="small" color="action" sx={{mr: 1}}/>
              }}
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
            <Grid container>
              <Grid item>
                <Link href="/auth/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        <br/>
      </Container>
  );
}
