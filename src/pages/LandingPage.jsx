import { Box, Button, CardMedia, Container, Divider, Grid, Paper, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import BlogPostCard from '../components/BlogPostCard'
import Footer from '../components/Footer'
import PictureItem from '../components/LandingPage/PictureItem'
import Newsletter from '../components/Newsletter'
import './landingpage.css'
import Loading from '../components/Loading/index'

function LandingPage() {
    const navigate = useNavigate()
    
    return (
    <div>
        <header>
            <Box id='signup' sx={{maxWidth: '600px', margin: '250px auto', p: 5, zIndex: 3}}>
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
                    <Button onClick={() => navigate('/auth/signup')} size="large" variant="outlined" sx={{color: 'hotpink', backgroundColor: 'white', borderRadius: '50px', float: 'left'}}>
                        Sign me Up
                    </Button>
                </Box>
            </Box>
        </header>
        <div className='header'></div>
        <Container maxWidth="lg" style={{marginTop: '100px', padding: '20px'}}>
            <Typography id='why' className='color-text' align='center' variant="h3" style={{marginTop: '10px', padding: '0px'}}><b>Why SnackBox?</b></Typography>
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
            <Typography id='aboutus' className='color-text' align='center' variant="h3" style={{marginTop: '10px', padding: '0px'}}><b>About Us</b></Typography>
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
                    <i>
                    “You can tell a lot about a fellow's character by his way of eating jellybeans.” 
                    </i><b> ―Ronald Reagan</b>
                </Typography>
            </Box>
            <br/>
            <br/>
            <Typography className='color-text' align='center' variant="h3" style={{marginTop: '10px', padding: '0px'}}><b>Stay in touch</b></Typography>
            <br/>
            <Divider/>
            <br id='newsletter'/>
            <Newsletter/>

            <br/>
            <br/>
            <Typography className='color-text' align='center' variant="h3" style={{marginTop: '10px', padding: '0px'}}><b>Blog Posts</b></Typography>
            <br/>
            <Divider/>
            <Box style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between'}}>
                <Box sx={{m: 2}}>
                    <BlogPostCard 
                    image="https://i.pinimg.com/originals/9f/a8/98/9fa8980f4de428e6160e97f5fe832599.jpg"
                    title="Cookies Are Awesome and you know that!"
                    id="1"
                    />
                </Box>
                <Box sx={{m: 2}}>
                    <BlogPostCard 
                    image="https://empoweredmastery.com/wp-content/uploads/2016/09/eat-food.jpg"
                    title="5 Reasons Why You Should Eat More Snacks"
                    id="2"
                    />
                </Box>
                <Box sx={{m: 2}}>
                    <BlogPostCard 
                    image="https://www.thelocal.de/wp-content/uploads/2019/08/b08c6fe9ba475c54cc455937c0eeb204e7f97c4d4935100e27f7d98a2f11979e-646x402.jpg"
                    title="The Perfect Summer Treat: Delicious Ice Cream"
                    id="3"
                    />
                </Box>
            </Box>

        </Container>
        <br/>
        <br/>
        <Footer/>
        </div>
    )
}

export default LandingPage
