import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import axios from 'axios'
import React, {useEffect, useState} from 'react'
import Loading from '../../components/Loading/index'

const columns = [
    { field: 'id', headerName: 'Order-ID', width: 70 },
    { field: 'id', headerName: 'User-ID', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 90,
    },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.getValue(params.id, 'firstName') || ''} ${
          params.getValue(params.id, 'lastName') || ''
        }`,
    },
  ];

function AdminOrders() {
    const [orders, setOrders] = useState(null)

    useEffect(() => {
        (async() => {
            const base_url = process.env.REACT_APP_API_BASE_URL
            const response = await axios.get(base_url + '/admin/orders', {superSecret: process.env.REACT_APP_ADMIN_SECRET})
            console.log(response)
            setOrders(response.data)
        })()
    }, [])

    if(!orders) return <Loading/>

    return (
        <Box className="border-gradiant" style={{maxWidth: '600px', borderRadius: '5px', padding: '10px 10px', margin: '0px auto', backgroundColor: '#f7f7f7', filter: 'drop-shadow(0 0 5px gray)'}}>
            <Typography variant='h2'>Customer Orders</Typography>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>id</TableCell>
                            <TableCell align="right">status</TableCell>
                            <TableCell align="right">Fat&nbsp;(g)</TableCell>
                            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                            <TableCell align="right">Protein&nbsp;(g)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {orders.map((row) => (
                        <TableRow
                        key={row.name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            {row.name}
                        </TableCell>
                        <TableCell align="right">{row.calories}</TableCell>
                        <TableCell align="right">{row.fat}</TableCell>
                        <TableCell align="right">{row.carbs}</TableCell>
                        <TableCell align="right">{row.protein}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </TableContainer>
        </Box>
    )
}

export default AdminOrders
