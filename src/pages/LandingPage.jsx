import { Box, Button, CardMedia, Container, Divider, Grid, Paper, Typography } from '@mui/material'
import React from 'react'
import PictureItem from '../components/LandingPage/PictureItem'
import Newsletter from '../components/Newsletter'
import './landingpage.css'

function LandingPage() {
    return (
    <div>
        <header id="wave">
            <Box sx={{maxWidth: '600px', marginLeft: '11%', marginTop: '7%', position: 'absolute', p: 5, zIndex: 3}}>
                <Box sx={{display: 'flex', alignItems: 'flex-end'}}>
                    <CardMedia
                        component="img"
                        style={{objectFit: 'contain', opacity: '1'}}
                        height="120"
                        image={'/snackbox_logo.png'}
                        alt="snackbox logo"
                    />
                    <Typography align='left' variant="h1" color="whitesmoke">
                    <strong>SnackBox</strong>
                    </Typography>
                </Box>
                <Box>
                    <Typography align='left' variant="h5" color="whitesmoke"><i>The Box full of snacks that will change your lazy life!</i></Typography>
                    <Typography align='left' variant="subtitle1" color="whitesmoke">
                        Never take candy from a stranger, unless they send you a box full of awesome candy every week!
                    </Typography>
                    <br/>
                    <Button size="large" variant="contained" sx={{color: 'hotpink', backgroundColor: 'white', borderRadius: '50px', float: 'left'}}>
                        Sign me Up
                    </Button>
                </Box>
            </Box>
        </header>
        <div className='header'></div>
        <Container maxWidth="lg" style={{marginTop: '100px', padding: '20px'}}>
            <Typography className='color-text' align='center' variant="h3" style={{marginTop: '10px', padding: '0px'}}><b>Why SnackBox?</b></Typography>
            <br/>
            <Divider/>
            <br/>
            <br/>
            <Box style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between'}}>
                <Box sx={{m: 2}}>
                    <PictureItem
                        image="https://png.pngtree.com/png-vector/20190219/ourlarge/pngtree-vector-cake-icon-png-image_563166.jpg"
                        header="Snacks are nice!"
                        text="How can you not like snacks? Snacks are the best and you know it!"
                    /> 
                </Box>
                <Box sx={{m: 2}}>
                    <PictureItem
                        image="https://clipart.world/wp-content/uploads/2020/08/delivery-truck-icon-png-transparent.png"
                        header="We are super fast!"
                        text="We have put a V8 turbo engine inside our trucks!"
                    />
                </Box>
                <Box sx={{m: 2}}>
                    <PictureItem
                        image="https://clipart.coolclips.com/480/vectors/tf05352/CoolClips_vc098902.png"
                        header="Snack Service!"
                        text="We come to your house and fix your computer!"
                    />  
                </Box>
            </Box>
            <br/>
            <br/>
            <Typography className='color-text' align='center' variant="h3" style={{marginTop: '10px', padding: '0px'}}><b>About Us</b></Typography>
            <br/>
            <Divider/>
            <br/>
            <Box component={Paper} sx={{maxWidth: '500px', p: 4, m: '0 auto', borderRadius: '20px', backgroundColor: '#f7f7f7', filter: 'drop-shadow(0 0 5px gray)'}}>
                <CardMedia
                    component="img"
                    style={{objectFit: 'contain', opacity: '1'}}
                    height="200"
                    image={'/snackbox_logo.png'}
                    alt="snackbox logo"
                />
                <Typography align='center' variant="h5" color="GrayText" style={{marginTop: '10px', padding: '0px'}}>
                    <b>We love snacks!</b>
                </Typography>
                <Typography align='center' variant="body1" style={{marginTop: '10px', padding: '0px'}}>
                    We are a team of individuals, that hate modern diets and love to snack all day! We think the world would be better when everybody eats more snacks.
                </Typography>
                <br/>
                <Typography align='center' variant="body1">
                    Our team invented the new "Lorem Ipsum": Chilie Chips, chocolate & peanut butter.
                </Typography>
            </Box>
            <br/>
            <br/>
            <Typography className='color-text' align='center' variant="h3" style={{marginTop: '10px', padding: '0px'}}><b>Stay in touch</b></Typography>
            <br/>
            <Divider/>
            <br/>
            <Newsletter/>
        </Container>
        <br/>
        <br/>
        <br/>
        </div>
    )
}

export default LandingPage
