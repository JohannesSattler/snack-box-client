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
} from '@mui/material'

const gridItemStyle = {borderRadius: '0px', border: '0px solid #9c9c9c', padding: '10px'}

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
        <Container fixed style={{backgroundColor: '#fafafa', padding: '30px'}}>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

                <Grid item md={8} style={{backgroundColor: 'white', borderRadius: '10px'}}>
                    <img src={product.image} alt={product.name}></img>
                </Grid>

                <Grid item md={4} style={gridItemStyle}>
                    <Typography align="left" variant="h3" component="h3">
                        Product details
                    </Typography>
                    <br/><br/>
                    <Typography align="left" variant="h6" component="h4">
                        {product.name}
                    </Typography>
                    <br/>
                    <Typography align="left" variant="subtitle1" component="h3">
                        {product.brand}
                    </Typography>
                    <br/><br/>

                    <Typography variant="h5" align="right" color="text.secondary" sx={{m: 1}}>
                        {product.price} €
                     </Typography>

                </Grid>

                <Grid item md={4} style={gridItemStyle}>
                    <Typography variant="h6" component="h3">
                        Nutrition Table
                    </Typography>
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
                    <Typography variant="h6" component="h3">
                        Ingredients
                    </Typography>
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
                    <Typography variant="h6" component="h3">
                        Other
                    </Typography>
                    <Typography variant="subtitle1" component="h3">
                        <Chip label={'Fat: ' + product.fat} color="success" style={{margin: 3}}/> 
                    </Typography>
                    <Typography variant="subtitle1" component="h3">
                        <Chip label={'Nutri Score: ' + product.nutriScore} color="success" style={{margin: 3}}/> 
                    </Typography>
                    <Typography variant="subtitle1" component="h3">
                        
                        <Chip label={'Contains Palm Oil:' + product.palmOil} color="success" style={{margin: 3}}/> 
                    </Typography>
                    <Typography variant="subtitle1" component="h3">
                        <Chip label={'Salt: ' + product.salt} color="success" style={{margin: 3}}/> 
                    </Typography>
                    <Typography variant="subtitle1" component="h3">
                        <Chip label={'Salty: ' + product.salty} color="success" style={{margin: 3}}/> 
                    </Typography>
                    <Typography variant="subtitle1" component="h3">
                        <Chip label={'Saturated Fat: ' + product.saturatedFat} color="success" style={{margin: 3}}/> 
                    </Typography>
                    <Typography variant="subtitle1" component="h3">
                        <Chip label={'Sugars: ' + product.sugars} color="success" style={{margin: 3}}/> 
                    </Typography>
                    <Typography variant="subtitle1" component="h3">
                        <Chip label={'Sweet: ' + product.sweet} color="success" style={{margin: 3}}/> 
                    </Typography>
                    <Typography variant="subtitle1" component="h3">
                        <Chip label={'Vegan: ' + product.vegan} color="success" style={{margin: 3}}/> 
                    </Typography>
                    <Typography variant="subtitle1" component="h3">
                        <Chip label={'Vegetarian: ' + product.vegetarian} color="success" style={{margin: 3}}/> 
                    </Typography>
                </Grid>
            </Grid>

        </Container>
    )
}

export default ProductDetailPage
