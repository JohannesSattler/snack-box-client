import React, {useContext, useEffect, useState} from "react";
import { Link, NavLink, useNavigate, Navigate, useHistory  } from "react-router-dom";
import "./Navbar.css";
import * as PATHS from "../../utils/paths";
import * as CONSTS from "../../utils/consts";
import * as CONFIG from '../../config/config'
import {UserContext} from '../../context/UserContext.js'
import NavLinkIcon from "../NavLinkIcon";

import MenuIcon from '@mui/icons-material/Menu';
import {
  AccountBox, 
  ShoppingCart, 
  Login, 
  Logout, 
  AppRegistration, 
  Home, 
  LocalShipping,
  AddBox,
  Category
} from '@mui/icons-material';

import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Button,
  MenuItem,
  CardMedia
} from '@mui/material'



const linkStyle = {color: 'white', textDecoration: 'none'}

const linksLeft = [
  { text: 'Home Page', path: PATHS.HOMEPAGE, icon: <Home/> },
  { text: 'Subscriptions', path: PATHS.HOMEPAGE, icon: <AddBox/> },
  { text: 'Products', path: PATHS.PRODUCTS, icon: <Category/> },
]

const linksRight = [
  { text: 'Your Orders', path: PATHS.ORDERS, icon: <LocalShipping/> },
  { text: 'Checkout', path: PATHS.CHECKOUT, icon: <ShoppingCart/> },
  { text: 'Profile', path: PATHS.PROFILE, icon: <AccountBox/> },
]

const linksAuth = [
  { text: 'Login', path: PATHS.LOGINPAGE, icon: <Login/> },
  { text: 'Sign Up', path: PATHS.SIGNUPPAGE, icon: <AppRegistration/> },
]

const links = {
  'Home Page': PATHS.HOMEPAGE,
  'Sign Up Stages': PATHS.SIGNUPSTAGES,
  'Subscriptions': PATHS.SUBSCRIPTIONS,
  'Products': PATHS.PRODUCTS,
  'Your Orders': PATHS.ORDERS,
  'Profile': PATHS.PROFILE,
  'Checkout': PATHS.CHECKOUT,
  'Sign Up': PATHS.SIGNUPPAGE,
  'Login': PATHS.LOGINPAGE,
}



const Navbar = (props) => {
  const navigate = useNavigate();
  const {user, setUser} = useContext(UserContext)
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [isInSignUpProcess, setIsInSignUpProcess] = useState(false)

  const [navchange, setNavChange] = useState(0)

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

  return (
    <>
    <AppBar position="fixed" style={{backgroundColor: '#e8e8e8', filter: 'drop-shadow(0 1px 10px #696969)'}}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Link to={!isInSignUpProcess ? PATHS.HOMEPAGE : PATHS.SIGNUPSTAGES} style={linkStyle}>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ mr: 5, display: { xs: 'none', md: 'flex' }, color: 'gray' }}
              >
              <CardMedia
                component="img"
                style={{objectFit: 'contain', opacity: '1'}}
                height="30"
                image={'/snackbox_logo.png'}
                alt="snackbox logo"
              />
                Snack Box
              </Typography>
            </Link>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, color: 'black' }}>
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
                <Box>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <NavLinkIcon text={'Subscriptions'} path={PATHS.SUBSCRIPTIONS} Icon={AddBox} />
                  </MenuItem>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <NavLinkIcon text={'Products'} path={PATHS.PRODUCTS} Icon={Category} />
                  </MenuItem>

                  {user ? (
                    <>
                      <MenuItem onClick={handleCloseNavMenu}>
                        <NavLinkIcon text={'Your Orders'} path={PATHS.ORDERS} Icon={LocalShipping} />
                      </MenuItem>
                      <MenuItem onClick={handleCloseNavMenu}>
                        <NavLinkIcon text={'Profile'} path={PATHS.PROFILE} Icon={AccountBox} />
                      </MenuItem>
                      <MenuItem onClick={handleCloseNavMenu}>
                        <NavLinkIcon text={'Checkout'} path={PATHS.CHECKOUT} color={'info'} Icon={ShoppingCart} />
                      </MenuItem>
                      <MenuItem onClick={handleCloseNavMenu}>
                        <Button
                          variant="outlined"
                          onClick={() => props.handleLogout()}
                          color="error"
                          startIcon={<Logout/>}
                        >
                          Log Out
                        </Button>
                      </MenuItem>
                    </>
                    ) : (
                      <Box>
                        <MenuItem>
                          <NavLinkIcon text={'Sign Up'} path={PATHS.SIGNUPPAGE} color={'primary'} Icon={AppRegistration} />
                        </MenuItem>
                        <MenuItem>
                          <NavLinkIcon text={'Login'} path={PATHS.LOGINPAGE} color={'success'} Icon={Login}/>
                        </MenuItem>
                      </Box>
                    )
                  }

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
              <Link to={!isInSignUpProcess ? PATHS.HOMEPAGE : PATHS.SIGNUPSTAGES} style={{color: 'gray', textDecoration: 'none'}}>
                Snack Box
              </Link>
            </Typography>

            <Box  sx={{ flexGrow: 0, display: { xs: 'flex', md: 'none' } }}>
              {user ? (
                <Button
                    variant="outlined"
                    onClick={() => props.handleLogout()}
                    color="error"
                    size={'small'}
                    startIcon={<Logout/>}
                >
                  
                </Button>

              ) : (
                <NavLinkIcon text={'Login'} path={PATHS.LOGINPAGE} color={'success'} Icon={Login}/>
              )}
            </Box>


          {/**
          
                <Button
                  variant="outlined"
                  onClick={() => props.handleLogout()}
                  color="error"
                  startIcon={<Logout/>}
                >
                  Log Out
                </Button>
          
           */}
            { // if no user is found and not in form
              !isInSignUpProcess ?
              ( 
                <>
                  <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                    <NavLinkIcon text={'Subscriptions'} path={PATHS.SUBSCRIPTIONS}Icon={AddBox} />
                    <NavLinkIcon text={'Products'} path={PATHS.PRODUCTS} Icon={Category} />
                  </Box>
                </>
              ) : (<></>)}


            { // if user is found and hasnt filled signup stage
              isInSignUpProcess ?
              ( 
                <>
                  <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>

                  </Box>
                </>
              ) : (<></>)
            }

            <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }} >
            {user ? (
                <>
                {
                  !isInSignUpProcess ? (
                    <>
                      <NavLinkIcon text={'Your Orders'} path={PATHS.ORDERS} Icon={LocalShipping} />
                      <NavLinkIcon text={'Profile'} path={PATHS.PROFILE} Icon={AccountBox} />
                      <NavLinkIcon text={'Checkout'} path={PATHS.CHECKOUT} color={'info'} Icon={ShoppingCart} />
                    </>
                  ) : (<></>)
                }

                <Button
                  variant="outlined"
                  onClick={() => props.handleLogout()}
                  color="error"
                  startIcon={<Logout/>}
                >
                  Log Out
                </Button>
                </>
              ) : (
                <>
                  <NavLinkIcon text={'Sign Up'} path={PATHS.SIGNUPPAGE} color={'primary'} Icon={AppRegistration} />
                  <NavLinkIcon text={'Login'} path={PATHS.LOGINPAGE} color={'success'} Icon={Login}/>
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
