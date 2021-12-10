import axios from 'axios'
import React, {useState, useEffect} from 'react'
import { useParams, Link } from 'react-router'
import Loading from '../components/Loading/index'
import { 
    Container, 
    Grid, 
    Typography, 
    List,
    Divider,
    Fab,
    AddIcon,
} from '@mui/material'

import ProductCard from '../components/ProductCard'

function SubscriptionDetailPage() {
    const {id} = useParams()
    const [subscription, setSubscriptions] = useState(null)

    useEffect(() => {
        
        (async() => {
            window.scrollTo(0, 0)
            const base_url = process.env.REACT_APP_API_BASE_URL
            const response = await axios.get(base_url + '/subscriptions/' + id)
            console.log(response.data)
            setSubscriptions(response.data)
        })()
    }, [])

    if(!subscription) {
        return <Loading></Loading>
    }

    let total = subscription.products.reduce((total, current) => total + current.price, 0)
    total = Number(total.toFixed(2))

    return (
        <Container fixed style={{backgroundColor: '#fafafa', padding: '30px'}}>
            <Grid container spacing={2}>

                <Grid item xs={8} >
                    <img style={{objectFit: 'fill', heigh: '100%', width: '100%', borderRadius: '20px'}} src={subscription.image} alt={subscription.title}></img>
                    <Typography variant="h4" component="h3">
                        {subscription.title}
                    </Typography>
                    <Typography variant="subtitle1" component="h3">
                        {subscription.description}
                    </Typography>
                    <br/>
                </Grid>

                <Grid item xs={4}>
                    <List
                    sx={{
                        width: '100%',
                        position: 'relative',
                        overflow: 'auto',
                        maxHeight: 400,
                        '& ul': { padding: 0 },
                    }}
                    subheader={<li />}
                    >
                    {
                        subscription.products.map((prod, index) => {
                            return (
                                <>
                                    <div style={{maxWidth: '100%', height: '25px'}}>
                                        <Typography noWrap={true} style={{maxWidth: '80%', height: '25px', float:'left'}} variant="body1" component="p">
                                            <strong>{index+1}.</strong> {prod.name}
                                        </Typography>
                                        <Typography style={{maxWidth: '20%', height: '25px', float:'right'}} color='primary' variant="body1" component="p">
                                        <strong>{prod.price} €</strong>
                                        </Typography>
                                    </div> 
                                    <Divider/>
                                </>
                            )
                        })
                    }
                    </List>
                    <br/>
                    <Divider/>
                    <Typography align="right" variant="h6" component="h3">
                        Total: {total} €
                    </Typography>
                </Grid>

                <Grid item xs={12} style={{borderTop: '2px solid #ababab'}}>
                    <Typography align="center" variant="h6" component="h3">
                        Products Inside
                    </Typography>
                    <Divider/>
                    <Container 
                    style={{minHeight:'300px', display: 'flex', flexWrap: 'wrap', justifyContent:'space-between'}}
                    >
                        {subscription.products.map(prod => {
                            return <ProductCard product={prod}/>
                        })}
                    </Container>
                </Grid>
            </Grid>
            
        </Container>
    )
}

export default SubscriptionDetailPage
