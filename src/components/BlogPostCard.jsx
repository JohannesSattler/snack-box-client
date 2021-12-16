import { Button, Card, CardContent, CardMedia, Divider, Link, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function BlogPostCard(props) {
    const navigate = useNavigate()
    const {image, title, id} = props

    return (
        <Card sx={{ width: 350, margin: '0px'}} raised={true}>
            <CardMedia
                component="img"
                style={{objectFit: 'contain'}}
                height="140"
                image={image}
                alt={title}
            />
            <Divider />
            <CardContent>
                <Typography gutterBottom noWrap={true} variant="h5" component="div">
                    {title}
                </Typography>
                <Divider style={{margin: '5px 0'}}/>
                <Link to={'/blog/' + id} style={{textDecoration: 'none'}}>
                    <Button
                    onClick={() => navigate('/blog/' + id)}
                    variant="outlined"
                    style={{marginTop: '10px'}}
                    >
                    Read more
                    </Button>
                </Link>
            </CardContent>
        </Card>
    )
}

export default BlogPostCard
