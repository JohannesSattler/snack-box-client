import { AppBar, Box, CardMedia, Container, Divider, Toolbar, Typography } from '@mui/material'
import React from 'react'

function Footer() {
    return (

        <>
        <AppBar position="static" style={{background: 'linear-gradient(90deg, rgba(0,212,255,1) 20%, #ef77a3 60%)', borderTop: '4px solid #e8e8e8'}}>
          <Container maxWidth="md">
            <Toolbar sx={{p: 1, width: '100%', my: 3}}>
                <CardMedia
                    component="img"
                    style={{objectFit: 'contain', opacity: '1'}}
                    height="80"
                    image={'/logo-big.png'}
                    alt="snackbox_logo"
                />
                <Box sx={{display: 'flex', flexDirection: 'column',flexWrap: 'wrap', height: '140px', width: '700px', mx: 3}}>
                    <Typography align="left" variant="subtitle2">
                    Some Links 😅
                    </Typography>
                    <Divider/>
                    <Typography align="left" variant="body1">
                        <a href='#signup' style={{color: 'white', textDecoration: "none"}}>Get started!</a>
                    </Typography>
                    <Typography align="left" variant="body1">
                        <a href='#why' style={{color: 'white', textDecoration: 'none'}}>Why Us?</a>
                    </Typography>
                    <Typography align="left" variant="body1">
                        <a href='#aboutus' style={{color: 'white', textDecoration: 'none'}}>About us</a>
                    </Typography>
                    <Typography align="left" variant="body1">
                        <a href='#newsletter' style={{color: 'white', textDecoration: 'none'}}>Newsletter</a>
                    </Typography>
                </Box>
                <Box sx={{display: 'flex', flexDirection: 'column',flexWrap: 'wrap', width: '700px', mx: 3}}>
                    <Typography align="left" variant="subtitle2">
                        Blog Posts
                    </Typography>
                    <Divider/>
                    <Typography align="left" variant="body1">
                        <a href='/blog/1' style={{color: 'white', textDecoration: "none"}}>Cookies are awes...</a>
                    </Typography>
                    <Typography align="left" variant="body1">
                        <a href='/blog/2' style={{color: 'white', textDecoration: 'none'}}>5 Reasons why...</a>
                    </Typography>
                    <Typography align="left" variant="body1">
                        <a href='/blog/3' style={{color: 'white', textDecoration: 'none'}}>The Perfect Sum...</a>
                    </Typography>
                </Box>
              <Typography align='right' sx={{width: '300px', px: 6}} variant="body1">
                © 2021 SnackBox
              </Typography>
            </Toolbar>
          </Container>
        </AppBar>
        </>
    )
}

export default Footer

/*         <Container 
        maxWidth="xll" 
        style={{
            display: 'flex',
            justifyContent: 'space-evenly',
            height: '200px', 
            borderTop: '10px solid #e6e6e6', 
            marginTop: '100px', 
            padding: '20px', 
            background: 'linear-gradient(90deg, rgba(0,212,255,1) 20%, #ef77a3 60%)', 
            filter: 'drop-shadow(0 0 5px gray)'}}>
            <CardMedia
                component="img"
                style={{objectFit: 'contain', opacity: '1'}}
                height="120"
                image={'/logo-big.png'}
                alt="snackbox logo"
            />
            <Box>
                <Typography align='left'>This is my Footer</Typography>
            </Box>
        </Container> */