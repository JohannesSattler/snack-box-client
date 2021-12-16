import React, {useEffect, useState} from 'react'
import Loading from '../components/Loading/index'
import ProductCard from '../components/ProductCard'
import axios from 'axios'
import { Pagination, Box, Container, Typography, Divider, Stack } from '@mui/material'


function ProductPage() {
    const [products, setProducts] = useState([])
    const [itemCount, setItemCount] = useState(0)
    const [index, setIndex] = useState(1)

    useEffect(() => {
        (async() => {
            const base = process.env.REACT_APP_API_BASE_URL
            const response = await axios.post(base + '/products', {page: 0})
            console.log(response)
            setProducts(response.data.products)
            setItemCount(response.data.itemCount)
        })()
    }, [])
    
    async function handlePaginateChange(e) {
        setProducts([])
        const page = Number(e.target.innerText) - 1
        setIndex(page)
        const base = process.env.REACT_APP_API_BASE_URL
        const response = await axios.post(base + '/products', {page})
        console.log(response)
        setProducts(response.data.products)
    }

    if(!products.length) {
        return <Loading></Loading>
    } 

    return (
        <Container maxWidth="xl" sx={{padding: '10px', backgroundColor: '#f7f7f7', filter: 'drop-shadow(0 0 5px gray)'}}>
        <br/>
        <Typography className='color-text' align="center" variant="h3"><b>All of our Products</b></Typography>
        <Typography variant='h5' color="GrayText">You can find some nice products that we dont even sell! 🤫</Typography>
        <Divider/>
            <Stack
            sx={{p: 5, m: '0 auto'}}
            direction="row"
            flexWrap="wrap"
            justifyContent="center"
            alignItems="center"
            divider={<Divider orientation="vertical" flexItem />}
            >
                {
                    products.map(product => {
                        return <ProductCard key={product._id} product={product}/>
                    })
                }

            </Stack>
            <Pagination 
            count={itemCount} 
            onChange={handlePaginateChange} 
            page={index} 
            color="primary" 
            hidePrevButton 
            hideNextButton
            style={{backgroundColor: 'transparent', margin: '30px'}}/>
        </Container>
    )
}

export default ProductPage
