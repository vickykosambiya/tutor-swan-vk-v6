import React from 'react'
import { Grid, Card, CardContent, Typography, CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Blog = () => {

    const blogPosts = [
        { id: 1, title: "Unlocking Educational Efficiency: The Bright Side of AI Grading", path: "/blog/1" },
        { id: 2, title: "The Future of Online Learning: Trends to Watch", path: "/blog/2" },
    ];

    const navigate = useNavigate();

    const handleCardClick = (path) => {
        navigate(path);
    };



    return (
        <>
            <Navbar />
            <Grid container justifyContent="center" spacing={3} sx={{ padding: { xs: 2, md: 4 } }}>
                <Grid item xs={12} md={8}>
                    {blogPosts.map((post) => (
                        <Card key={post.id} sx={{ marginBottom: 2, borderRadius: 2 }}>
                            <CardActionArea onClick={() => handleCardClick(post.path)}>
                                <CardContent>
                                    <Typography variant="h5" component="div">
                                        {post.title}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    ))}
                </Grid>
            </Grid>
            <Footer />
        </>
    );


}

export default Blog
