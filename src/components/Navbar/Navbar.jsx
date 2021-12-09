import React, {useContext, useEffect, useState} from "react";
import { Link, NavLink, useNavigate, Navigate, useHistory  } from "react-router-dom";
import "./Navbar.css";
import * as PATHS from "../../utils/paths";
import * as CONSTS from "../../utils/consts";

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import * as CONFIG from '../../config/config'

import {UserContext} from '../../context/UserContext.js'

const linkStyle = {color: 'white', textDecoration: 'none'}

const Navbar = (props) => {
  const navigate = useNavigate();
  const {user, setUser} = useContext(UserContext)
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [isInSignUpProcess, setIsInSignUpProcess] = useState(false)

  const [navchange, setNavChange] = useState(0)

  useEffect(() => {
    if(user && user.signupStage <= CONFIG.MAX_SIGNUP_STAGE) {
      const pageRoute = {
        0: 'personal-information',
        1: 'snack-information',
        2: 'payment-information',
        3: 'subscription-information'
      }

      navigate('/signup/' + pageRoute[user.signupStage]);
    }  
  }, [navchange])

  useEffect(() => {
    if(!user) {
      setIsInSignUpProcess(false)
      return;
    }
    if(user.signupStage <= CONFIG.MAX_SIGNUP_STAGE) {
      setIsInSignUpProcess(true)
    }
    else {
      setIsInSignUpProcess(false)
    }
  }, [user])

  function handleSignUpStageClick() {
    setNavChange(navchange+1)
  }

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  console.log( user?.signupStage || 10 )
  return (
    <>
    <AppBar position="fixed" style={{backgroundColor: '#212121', filter: 'drop-shadow(0 1px 10px #696969)'}}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Link to={PATHS.HOMEPAGE} style={linkStyle}>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ mr: 5, display: { xs: 'none', md: 'flex' } }}
              >
                {CONSTS.CAPITALIZED_APP}
              </Typography>
            </Link>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>

              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
                
              >
            { // if user is found and hasnt filled signup stage
              !isInSignUpProcess ?
              ( 
                  <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                    <Link to={PATHS.PLANS} style={linkStyle}>
                      <Button
                        onClick={handleCloseNavMenu}
                        sx={{ my: 2, color: 'white', display: 'block' }}
                      >
                        Plans
                      </Button>
                    </Link>
                    <Link to={PATHS.PRODUCTS} style={linkStyle}>
                      <Button
                        onClick={handleCloseNavMenu}
                        sx={{ my: 2, color: 'white', display: 'block'}}
                      >
                        Products
                      </Button>
                    </Link>
                  </Box>
              ) : (<Box></Box>)}
              </Menu>


            </Box>

            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
            >
              <Link to={PATHS.HOMEPAGE} style={linkStyle}>
                  {CONSTS.CAPITALIZED_APP}
              </Link>
            </Typography>
          
            { // if no user is found and not in form
              !isInSignUpProcess ?
              ( 
                <>
                  <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                    <Link to={PATHS.PLANS} style={linkStyle}>
                      <Button
                        onClick={handleCloseNavMenu}
                        sx={{ my: 2, color: 'white', display: 'block' }}
                      >
                        Plans
                      </Button>
                    </Link>
                    <Link to={PATHS.PRODUCTS} style={linkStyle}>
                      <Button
                        onClick={handleCloseNavMenu}
                        sx={{ my: 2, color: 'white', display: 'block'}}
                      >
                        Products
                      </Button>
                    </Link>
                  </Box>

                </>
              ) : (<></>)}


            { // if user is found and hasnt filled signup stage
              isInSignUpProcess ?
              ( 
                <>
                  <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                    <Typography 
                      gutterBottom 
                      variant="h9" 
                      component="h3" 
                      align="center"
                      sx={{mx: 1, mt: 1.5}}
                      color={(user?.signupStage || 0) >= 1 ? 'rgb(69, 184, 79)' : 'rgb(131, 131, 131)'}
                      >
                        Personal ❯
                      </Typography>
                    
                      <Typography 
                      gutterBottom 
                      variant="h9" 
                      component="h3" 
                      align="center"
                      sx={{mx: 1, mt: 1.5}}
                      color={(user?.signupStage || 0) >= 2 ? 'rgb(69, 184, 79)' : 'rgb(131, 131, 131)'}
                      >
                        Snacks ❯
                      </Typography>

                      <Typography 
                      gutterBottom 
                      variant="h9" 
                      component="h3" 
                      align="center"
                      sx={{mx: 1, mt: 1.5}}
                      color={(user?.signupStage || 0) >= 3 ? 'rgb(69, 184, 79)' : 'rgb(131, 131, 131)'}
                      >
                        Payment ❯
                      </Typography>

                      <Typography 
                      gutterBottom 
                      variant="h9" 
                      component="h3" 
                      align="center"
                      sx={{mx: 1, mt: 1.5}}
                      color={(user?.signupStage || 0) >= 4 ? 'rgb(69, 184, 79)' : 'rgb(131, 131, 131)'}
                      >
                        Subscription ❯
                      </Typography>
                  </Box>
                </>
              ) : (<></>)
            }

            <Box sx={{ flexGrow: 0, display: { md: 'flex' } }} >
            {user ? (
                <Button
                  style={{backgroundColor: 'tomato'}}
                  onClick={() => props.handleLogout()}
                  sx={{ my: 1, color: 'white' }}
                >
                  Log Out
                </Button>
              ) : (
                <>
                <Link to={PATHS.SIGNUPPAGE} style={linkStyle}>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={handleCloseNavMenu}
                    sx={{ my: 1, mx: 1, color: 'white' }}
                  >
                    Sign Up
                  </Button>
                </Link>
                <Link to={PATHS.LOGINPAGE} style={linkStyle}>
                  <Button
                    variant="contained"
                    color="success"
                    size="large"
                    onClick={handleCloseNavMenu}
                    sx={{ my: 1, mx: 1, color: 'white' }}
                  >
                    Log In
                  </Button>
                </Link>
                </>
              )
            }
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      </>
  );
};

export default Navbar;


/* 
  <nav>
  <Link to={PATHS.HOMEPAGE} className="nav__projectName">
  {CONSTS.CAPITALIZED_APP} - created with IronLauncher
  </Link>
  
  <div className="nav__authLinks">
  {props.user ? (
    <>
            <Link to={PATHS.PROTECTEDPAGE} className="authLink">
              Protected Page
            </Link>
            <button className="nav-logoutbtn" onClick={props.handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to={PATHS.SIGNUPPAGE} className="authLink">
              Signup
            </Link>
            <Link to={PATHS.LOGINPAGE} className="authLink">
              Log In
            </Link>
          </>
        )}
      </div>
    </nav>  
    
    */
