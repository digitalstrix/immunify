import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './index.css';
import { NavLink } from 'react-router-dom';

const Viewblog = () => {
    return (
        <>
            <div>
                <h1>View Blogs</h1>
                <div>
                    <div className="row">
                        <Card sx={{ maxWidth: 345, margin: 1 }}>
                            <CardMedia
                                component="img"
                                height="140"
                                image="/static/images/content/p2.jpeg"
                                alt="green iguana"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Lizard
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Lizards are a widespread group of squamate reptiles, with over 6,000
                                    species, ranging across all continents except Antarctica
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small">Share</Button>
                                <NavLink to="/viewBlogDetails/1">Read More ..</NavLink>
                            </CardActions>
                        </Card>
                        <Card sx={{ maxWidth: 345, margin: 1 }}>
                            <CardMedia
                                component="img"
                                height="140"
                                image="/static/images/content/p2.jpeg"
                                alt="green iguana"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Lizard
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Lizards are a widespread group of squamate reptiles, with over 6,000
                                    species, ranging across all continents except Antarctica
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small">Share</Button>
                                <NavLink to="/viewBlogDetails/1">Read More ..</NavLink>
                            </CardActions>
                        </Card>
                        <Card sx={{ maxWidth: 345, margin: 1 }}>
                            <CardMedia
                                component="img"
                                height="140"
                                image="/static/images/content/p2.jpeg"
                                alt="green iguana"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Lizard
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Lizards are a widespread group of squamate reptiles, with over 6,000
                                    species, ranging across all continents except Antarctica
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small">Share</Button>
                                <NavLink to="/viewBlogDetails/1">Read More ..</NavLink>
                            </CardActions>
                        </Card>
                        <Card sx={{ maxWidth: 345, margin: 1 }}>
                            <CardMedia
                                component="img"
                                height="140"
                                image="/static/images/content/p2.jpeg"
                                alt="green iguana"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Lizard
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Lizards are a widespread group of squamate reptiles, with over 6,000
                                    species, ranging across all continents except Antarctica
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small">Share</Button>
                                <NavLink to="/viewBlogDetails/1">Read More ..</NavLink>
                            </CardActions>
                        </Card>
                        <Card sx={{ maxWidth: 345, margin: 1 }}>
                            <CardMedia
                                component="img"
                                height="140"
                                image="/static/images/content/p2.jpeg"
                                alt="green iguana"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Lizard
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Lizards are a widespread group of squamate reptiles, with over 6,000
                                    species, ranging across all continents except Antarctica
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small">Share</Button>
                                <NavLink to="/viewBlogDetails/1">Read More ..</NavLink>
                            </CardActions>
                        </Card>
                        <Card sx={{ maxWidth: 345, margin: 1 }}>
                            <CardMedia
                                component="img"
                                height="140"
                                image="/static/images/content/p2.jpeg"
                                alt="green iguana"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Lizard
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Lizards are a widespread group of squamate reptiles, with over 6,000
                                    species, ranging across all continents except Antarctica
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small">Share</Button>
                                <NavLink to="/viewBlogDetails/1">Read More ..</NavLink>
                            </CardActions>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Viewblog;
