import React, {useEffect, useState} from 'react'
import Loading from '../components/Loading/index'
import ProductCard from '../components/ProductCard'
import axios from 'axios'
import { Pagination, Box } from '@mui/material'


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
        const page = e.target.innerText
        setIndex(Number(page))
        const base = process.env.REACT_APP_API_BASE_URL
        const response = await axios.post(base + '/products', {page})
        console.log(response)
        setProducts(response.data.products)
    }

    if(!products.length) {
        return <Loading></Loading>
    } 

    return (
        <Box>
            <div 
            style={{
                    display: 'flex', 
                    flexWrap: 'wrap', 
                    justifyContent: 'center', 
                    alignItems: 'flex-start',
                    width: '80%', 
                    margin: '0 auto',
                    height: '100%'
                }}
            >
                {
                    products.map(product => {
                        return <ProductCard key={product._id} product={product}/>
                    })
                }

            </div>
            <Pagination 
            count={itemCount} 
            boundaryCount={2}
            onChange={handlePaginateChange} 
            page={index} 
            color="primary" 
            hidePrevButton 
            hideNextButton
            style={{backgroundColor: 'transparent', margin: '30px'}}/>
        </Box>
    )
}

export default ProductPage
