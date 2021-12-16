import axios from 'axios'
import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router'
import Loading from '../components/Loading/index'
import { 
    Container, 
    Grid, 
    Typography, 
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody, 
    Chip,
    Divider,
    Box,
} from '@mui/material'

const gridItemStyle = {borderRadius: '10px', border: '2px solid #d1d1d1', padding: '10px', backgroundColor: '#f1f1f1', margin: '5px'}

function ProductDetailPage() {
    const [product, setProduct] = useState(null)
    const params = useParams()

    useEffect(() => {
        (async() => {
            const base_url = process.env.REACT_APP_API_BASE_URL
            const response = await axios.get(base_url + '/products/' + params.id)
            console.log(response.data)
            setProduct(response.data)
        })()
    }, [])

    if(!product) {
        return <Loading></Loading>
    }

    return (
        <Container fixed style={{backgroundColor: '#fff', padding: '20px'}}>
            <br/>
            <Grid container rowspacing={2} columnSpacing={2}>

                <Grid item md={8} style={{backgroundColor: '#fff'}}>
                    <img src={product.image} alt={product.name} height="300"></img>
                    <br/>
                </Grid>

                <Grid item md={4} style={{backgroundColor: '#fff', borderRadius: '0px', padding: '20px', borderLeft: ' 2px solid gray'}}>
                    <Typography align="left" variant="h5">
                        Product details
                    </Typography>
                    <Divider/>
                    <br/>
                    <Typography align="left" variant="h6">
                        {product.name}
                    </Typography>
                    <Typography align="left" variant="subtitle1">
                        <i>{product.brand}</i>
                    </Typography>
                    <Divider/>
                    <br/>
                    <Typography align="left" variant="body1">
                        {product.description || 'This item doesnt has a description 😔'}
                    </Typography>
                    <br/>
                    <Typography variant="h5" align="right" color="text.secondary" sx={{m: 1}}>
                        {product.price} €
                     </Typography>
                     <br/>
                </Grid>
                <Grid item md={3.5} style={gridItemStyle}>
                    <br/>
                    <Typography variant="h6" component="h3">
                        Nutrition Table
                    </Typography>
                    <Divider/>
                    <br/>
                    <TableContainer style={{backgroundColor: '#f0f0f0', borderRadius: '10px'}}>
                        <Table aria-label="simple table">
                            <TableHead>
                            <TableRow>
                                <TableCell>Type</TableCell>
                                <TableCell align="center">Value</TableCell>
                                <TableCell align="center">Unit</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                                { //Loop through nutritions
                                    Object.keys(product.nutrtionTable).map((nutrit, index) => {
                                        if(index % 2 === 1) {
                                        return ( 
                                            <TableRow key={nutrit + index}>
                                                <TableCell component="th" scope="row">
                                                    { Object.keys(product.nutrtionTable)[index-1] }
                                                </TableCell>
                                                <TableCell align="center">
                                                    { 
                                                        Object.values(product.nutrtionTable)[index-1].toFixed(2) 
                                                    }
                                                </TableCell>
                                                <TableCell align="center">
                                                    { product.nutrtionTable[nutrit]}
                                                </TableCell>
                                            </TableRow>
                                            )
                                        }
                                    })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                
                <Grid item md={5} style={gridItemStyle}>
                    <br/>
                    <Typography variant="h6" component="h3">
                        Ingredients
                    </Typography>
                    <Divider/>
                    <br/>
                    {
                        product.ingredients
                        .replace(/[^a-zA-Z,]/g, ' ')
                        .split(',')
                        .map((ingredient, index) => {
                            return (
                                <Chip key={ingredient + index} label={ingredient} color="primary" style={{margin: 3}}/>
                            )
                        })
                    }
                </Grid>

                <Grid item md={3} style={gridItemStyle}>
                    <br/>
                    <Typography variant="h6" component="h3">
                        Other
                    </Typography>
                    <Divider/>
                    <br/>
                    <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                        <Typography align="left" variant="body1" component="h3">
                            <b>Fat:</b>
                        </Typography>
                        <Typography align="right" variant="body1" component="h3">
                            {product.fat}
                        </Typography>
                    </Box>
                    <Divider/>
                    <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                        <Typography align="left" variant="body1" component="h3">
                            <b>Nutri Score:</b>
                        </Typography>
                        <Typography align="right" variant="body1" component="h3">
                            {product.nutriScore.toUpperCase()}
                        </Typography>
                    </Box>
                    <Divider/>
                    <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                        <Typography align="left" variant="body1" component="h3">
                            <b>Contains Palm Oil:</b>
                        </Typography>
                        <Typography align="right" variant="body1" component="h3">
                            {product.palmOil ? '✅' : '❌'}
                        </Typography>
                    </Box>
                    <Divider/>
                    <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                        <Typography align="left" variant="body1" component="h3">
                            <b>Salt:</b>
                        </Typography>
                        <Typography align="right" variant="body1" component="h3">
                            {product.salt}
                        </Typography>
                    </Box>
                    <Divider/>
                    <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                        <Typography align="left" variant="body1" component="h3">
                            <b>Salty:</b>
                        </Typography>
                        <Typography align="right" variant="body1" component="h3">
                            {product.salty ? '✅' : '❌'}
                        </Typography>
                    </Box>
                    <Divider/>
                    <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                        <Typography align="left" variant="body1" component="h3">
                            <b>Saturated Fat:</b>
                        </Typography>
                        <Typography align="right" variant="body1" component="h3">
                            {product.saturatedFat ? '✅' : '❌'}
                        </Typography>
                    </Box>
                    <Divider/>
                    <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                        <Typography align="left" variant="body1" component="h3">
                            <b>Sugars:</b>
                        </Typography>
                        <Typography align="right" variant="body1" component="h3">
                            {product.sugars ? '✅' : '❌'}
                        </Typography>
                    </Box>
                    <Divider/>
                    <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                        <Typography align="left" variant="body1" component="h3">
                            <b>Sweet:</b>
                        </Typography>
                        <Typography align="right" variant="body1" component="h3">
                            {product.sweet ? '✅' : '❌'}
                        </Typography>
                    </Box>
                    <Divider/>
                    <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                        <Typography align="left" variant="body1" component="h3">
                            <b>Vegan:</b>
                        </Typography>
                        <Typography align="right" variant="body1" component="h3">
                            {product.vegan ? '✅' : '❌'}
                        </Typography>
                    </Box>
                    <Divider/>
                    <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                        <Typography align="left" variant="body1" component="h3">
                            <b>Vegetarian:</b>
                        </Typography>
                        <Typography align="right" variant="body1" component="h3">
                            {product.vegetarian ? '✅' : '❌'}
                        </Typography>
                    </Box>
                    <Divider/>
                </Grid>
            </Grid>

        </Container>
    )
}

export default ProductDetailPage
