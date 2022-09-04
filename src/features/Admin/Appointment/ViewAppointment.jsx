import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './index.css';
import { NavLink } from 'react-router-dom';


const Viewappointment = () => {
    return (
        <>
            <div>
                <h1>View Appointments</h1>
                <div>
                    <div className="row">
                        <Card sx={{ maxWidth: 345 }}>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Patient Name
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Appointment ID | 20/09/2022 - 7:30 AM
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Doctor Name
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    This will be the description (Limited words, Click read more to see..)
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small">Share</Button>
                                <NavLink to="/appointment-details/1">Read More ..</NavLink>
                            </CardActions>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Viewappointment;
