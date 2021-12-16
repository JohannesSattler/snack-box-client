import React, {useState, useEffect} from 'react'
import { Alert, Button, CardMedia, Container, Divider, Paper, TextField, Typography, Box, TablePagination, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material'
import axios from 'axios';
import Loading from '../../components/Loading/index'

function AdminSubscription() {
    const [products, setProducts] = useState([])
    const [productsSub, setProductsSub] = useState([])
    const [error, setError] = useState("")
    const [form, setForm] = useState({
        image: '',
        description: '',
        title: '',
        price: 0,
    });

    useEffect(() => {
        (async() => {
            const base_url = process.env.REACT_APP_API_BASE_URL
            const response = await axios.get(base_url + '/admin/products')
            console.log(response)
            setProducts(response.data)
        })()
    }, [])

    const {         
        image,
        description,
        title,
        price,
    } = form;

    async function handleFormSubmission(event) {
        event.preventDefault();

        const data = {
            image,
            title,
            description,
            total: Number(productsSub.reduce((acc, current) => acc + current.price,0).toFixed(2)),
            products: productsSub.map(prod => prod._id)
        };

        const base_url = process.env.REACT_APP_API_BASE_URL
        const response = await axios.post(base_url + '/admin/subscription/create', data)
        console.log(response)
    }    

    function handleInputChange(event) {
        const { name, value } = event.target;
        return setForm({ ...form, [name]: value });
    }

    if(!products.length) return <Loading/>

    return (
        <Container component={Paper} maxWidth="lg" sx={{my: 3, paddingTop: '10px', backgroundColor: '#f7f7f7', filter: 'drop-shadow(0 0 5px gray)'}}>
          <Typography variant="h4" className='color-text'><b>Create a subscription</b></Typography>
          <Divider/>
          <Box component="form" onSubmit={handleFormSubmission} noValidate sx={{ mt: 1}}>
            <TextField
                margin="dense"
                label="image"
                name="image"
                fullWidth
                onChange={handleInputChange}
                style={{marginRight: 2}}
                variant="standard"
                placeholder='please provide url'
              />
              <TextField
                margin="dense"
                id="title"
                label="title"
                name="title"
                fullWidth
                autoComplete="name"
                onChange={handleInputChange}
                style={{marginRight: 2}}
                variant="standard"
              />
            <TextField
                margin="dense"
                label="description"
                name="description"
                onChange={handleInputChange}
                style={{marginRight: 2}}
                variant="standard"
                fullWidth
                multiline
                placeholder='please provide a description'
              />
              <br/>
              <br/>
            {
                productsSub ? (
                    <>
                    {                    
                    productsSub.map((prod, index) => {
                        return (
                            <>
                            <Typography key={prod.name} align='left' variant='body2'>{index+1}. {prod.name}</Typography>
                            <Divider/>
                            </>)
                    })
                    }
                    </>
                ) : (<></>)
            }
            <br/>
            <TableContainer component={Paper} sx={{ width: '100%', overflow: 'auto', maxHeight: 440 }}>-
                <Table stickyHeader  sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                    <TableRow>
                        <TableCell>Add Product</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell align="left">brand</TableCell>
                        <TableCell align="left">vegan</TableCell>
                        <TableCell align="left">vegetarian</TableCell>
                        <TableCell align="left">sweet</TableCell>
                        <TableCell align="left">salty</TableCell>
                        <TableCell align="left">organic</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {products.map((product) => (
                        <TableRow
                        key={product.name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 }}}
                        >
                        <TableCell component="th" scope="row">
                            <Button size="small" variant='contained' onClick={() => setProductsSub([...productsSub, product])}>Add</Button>
                        </TableCell>
                        <TableCell component="th" scope="row">
                            {product.name.slice(0, 10)}...
                        </TableCell> {/**✅❌ */}
                        <TableCell align="left">{product.brand.slice(0, 10)}...</TableCell>
                        <TableCell align="left">{product.vegan === "true" ? "✅" : "❌"}</TableCell>
                        <TableCell align="left">{product.vegetarian === "true" ? "✅" : "❌"}</TableCell>
                        <TableCell align="left">{product.sweet === "true" ? "✅" : "❌"}</TableCell>
                        <TableCell align="left">{product.salty === "true" ? "✅" : "❌"}</TableCell>
                        <TableCell align="left">{product.organic === "true" ? "✅" : "❌"}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </TableContainer>


            {error && (
              <Alert severity="error">{error.message}</Alert>
            )}
            <br/>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 1, mb: 2 }}
            >
              Save
            </Button>
          </Box>
          <br/>
      </Container>
    )
}

export default AdminSubscription
