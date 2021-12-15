import React, {useState, useEffect} from 'react'
import { Alert, Button, CardMedia, Container, Divider, Paper, TextField, Typography, Box, TablePagination, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material'
import axios from 'axios';
import Loading from '../../components/Loading/index'

function AdminSubscription() {
    const [products, setProducts] = useState([])
    const [error, setError] = useState("")
    const [form, setForm] = useState({
        image: '',
        describtion: '',
        name: '',
        price: 0,
    });

    useEffect(() => {
        (async() => {
            const base_url = process.env.REACT_APP_API_BASE_URL
            const response = await axios.get(base_url + '/admin/products')
            setProducts(response)
        })()
    }, [])

    const {         
        image,
        describtion,
        name,
        price,
    } = form;

    async function handleFormSubmission(event) {
        event.preventDefault();

        const data = {
            image,
            name,
            describtion,
            total: Number(price),
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
        <Container component={Paper} maxWidth="sm" sx={{my: 3, paddingTop: '10px', backgroundColor: '#f7f7f7', filter: 'drop-shadow(0 0 5px gray)'}}>
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
                label="describtion"
                name="describtion"
                onChange={handleInputChange}
                style={{marginRight: 2}}
                variant="standard"
                fullWidth
                multiline
                placeholder='please provide a description'
              />
              <TextField
                margin="dense"
                id="name"
                label="name"
                name="name"
                autoComplete="name"
                onChange={handleInputChange}
                style={{marginRight: 2}}
                variant="standard"
              />
             <TextField
                margin="dense"
                id="price"
                type="number"
                label="price"
                name="price"
                defaultValue={0}
                autoComplete="number"
                onChange={handleInputChange}
                style={{marginRight: 2}}
                variant="standard"
              />
            
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">brand</TableCell>
                        <TableCell align="right">vegan</TableCell>
                        <TableCell align="right">vegetarian</TableCell>
                        <TableCell align="right">sweet</TableCell>
                        <TableCell align="right">salty</TableCell>
                        <TableCell align="right">organic</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {products.map((product) => (
                        <TableRow
                        key={product.name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            {product.name}
                        </TableCell>
                        <TableCell align="right">{product.brand}</TableCell>
                        <TableCell align="right">{product.vegan}</TableCell>
                        <TableCell align="right">{product.vegetarian}</TableCell>
                        <TableCell align="right">{product.sweet}</TableCell>
                        <TableCell align="right">{product.salty}</TableCell>
                        <TableCell align="right">{product.organic}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </TableContainer>


            {error && (
              <Alert severity="error">{error.message}</Alert>
            )}
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
