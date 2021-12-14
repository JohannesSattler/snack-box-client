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

    useEffect(() => {
        if(status.packBox.current) {
            setActiveStep(0)
        }
        else if(status.orderOnWay.current) {
            setActiveStep(1)
        }
        else if(status.arrived.current) {
            setActiveStep(2)
        }
    }, [])

    return (
        <Box sx={{ maxWidth: 800, margin: '0 auto', display: 'flex'}}>
            <Box sx={{ maxWidth: 300, margin: '10px 20px'}}>
                {
                subscription && (
                        <>
                        <CardMedia
                        component="img"
                        style={{objectFit: 'contain', borderRadius: '20px'}}
                        width="400"
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
            <Stepper activeStep={activeStep} orientation="vertical" sx={{ maxWidth: 500}}>
                {Object.keys(status).map((key, index) => (
                    <Step key={status[key].label + index}>
                        <StepLabel>
                            <Typography variant="h5">{status[key].label}</Typography>
                            <Typography align="left" color="primary" variant="subtitle2"><i><b>{status[key].date}</b></i></Typography>
                        </StepLabel>
                        <StepContent>
                            <Divider/>
                            <Typography align="left" variant="body1">{status[key].additionalInfo}</Typography>
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
