import { 
    Container,
    Box,
    Stepper,
    Step,
    StepLabel, 
    Typography,
    StepContent,
    Button,
    Paper,
    Divider,
    CardMedia,
} from '@mui/material'
import { Link } from 'react-router-dom'
import React, {useState, useEffect} from 'react'

function Order(props) {
    const {status, subscription} = props
    const [activeStep, setActiveStep] = useState(0);
    const [message, setMessage] = useState('')

    useEffect(() => {
        if(status.orderReceived.current) {
            setActiveStep(0)
            const message = 
            `Thanks for trusting in SnackBox. We just received your order and we will pack you box with lightspeed!`
            setMessage(message)
        }
        else if(status.packBox.current) {
            setActiveStep(1)
            const message = 
            `Oh man snacks are nice and so are you! We love snacks thats why we will send your box as fast as possible!`
            setMessage(message)
        }
        else if(status.orderOnWay.current) {
            setActiveStep(2)
            const message = 
            `Oh nice your box is on da way. Turn on Netflix and get hyped!`
            setMessage(message)
        }
        else if(status.arrived.current) {
            setActiveStep(3)
            const message = 
            `Oh boi we hope you have a beautifull time with your awesome snacks!`
            setMessage(message)
        }
    }, [])

    return (
        <Box className="border-gradiant" raised sx={{ maxWidth: 800, margin: '10px auto', display: 'flex', flexWrap: 'wrap', padding: '10px', borderRadius: '10px', backgroundColor: '#f7f7f7', filter: 'drop-shadow(0 0 5px gray)'}}>
            <Box sx={{ maxWidth: 300, margin: '10px auto'}}>
                {
                subscription && (
                        <>
                        <CardMedia
                        component="img"
                        style={{objectFit: 'contain', borderRadius: '20px'}}
                        image={subscription.image}
                        alt={subscription.title}
                        />
                        <br/>
                        <Divider />
                        <Typography gutterBottom noWrap={true} variant="h5" component="div">
                            {subscription.title}
                        </Typography>
                        <Typography variant="body2" noWrap={true} color="text.secondary">
                            {subscription.description}
                        </Typography>
                        <Link to={'/subscriptions/' + subscription._id} style={{textDecoration: 'none'}}>
                            <Button
                            variant="text"
                            style={{margin: '0px 0', height: '40px'}}
                            >
                            See more
                            </Button>
                        </Link>
                        </>
                    )
                }
            </Box>
            <Stepper activeStep={0} orientation="vertical" sx={{ maxWidth: 400, marginLeft: '10px', margin: '0 auto'}}>
                {Object.keys(status).map((key, index) => (
                    <Step key={props.order._id + index}>
                        <StepLabel>
                            <Typography variant="h5">{status[key].label}</Typography>
                        </StepLabel>
                        <StepContent>
                            <Typography align="left" color="primary" variant="subtitle2"><i><b>{new Date(status[key].date).toLocaleString()}</b></i></Typography>
                            <Divider/>
                            <Typography align="left" variant="body1">{message}</Typography>
                            <br/>
                            <Typography align="left" variant="body2">If you are facing issues hit us up on: <b>helpme@snackbox.com</b></Typography>
                            <Typography align="left" variant="body2"><i>{status[key].additionalInfo}</i></Typography>
                            
                            
                            {status[key].trackingLink ? 
                                (
                                    <Typography align="left" variant="body1">
                                        <Link style={{left: 0}} variant="subtitle2" href={status[key].trackingLink} underline="hover">
                                            tracking link
                                        </Link>
                                    </Typography>
                                )
                            : (<></>)
                            }
                        </StepContent>
                    </Step>
                ))}
            </Stepper>
        </Box>
    )
}

export default Order
