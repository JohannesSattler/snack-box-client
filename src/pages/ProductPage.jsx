import React, {useEffect, useState} from 'react'
import Loading from '../components/Loading/index'
import ProductCard from '../components/ProductCard'
import axios from 'axios'


function ProductPage() {
    const [products, setProducts] = useState([])

    useEffect(() => {
        (async() => {
            const base = process.env.REACT_APP_API_BASE_URL
            const response = await axios.get(base + '/products')
            console.log(response)
            setProducts(response.data)
        })()
    }, [])

    if(!products.length) {
        return <Loading></Loading>
    } 

    return (
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
    )
}

export default ProductPage
