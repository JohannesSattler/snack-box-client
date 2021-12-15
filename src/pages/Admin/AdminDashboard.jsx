import { Container, Paper, Typography } from '@mui/material'
import React, {useEffect} from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import Order from '../../components/Order';
import AdminCreateProduct from './AdminCreateProduct';
import AdminOrders from './AdminOrders';
import AdminSubscription from './AdminSubscription';

function AdminDashboard(props) {
    const navigate = useNavigate()
    const location = useLocation();

    useEffect(() => {
        if(!location.state?.superSecret || location.state.superSecret !== process.env.REACT_APP_ADMIN_SECRET) {
            navigate('/admin/login')
        }
    }, [])

    return (
        <Container maxWidth="xl" sx={{paddingTop: '10px'}}>
            <br/>
            <br/>
            <Typography color="white" variant='h3'><b>Hey Admin!</b></Typography>
            <br/>
            <AdminCreateProduct/>
            <AdminSubscription/>
            {/**<AdminOrders/>*/}
        </Container>
    )
}

export default AdminDashboard
