import { Card, CardActionArea, CardContent, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

const UserDetails = () => {
    const [user, setUser] = useState({})
     const {id} = useParams()


    useEffect(() => {
        const url = `https://jsonplaceholder.typicode.com/users/${id}`
        fetch(url)
        .then(res => res.json())
        .then(data => setUser(data))
    }, [])
    return (
        <div className="justify-content-center align-items-center p-5 m-5">
            <Card sx={{ maxWidth: 360}}>
                <CardActionArea>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            <h4>{user.name}</h4>
                            <p>{user.email}</p>
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {user.website}
                            <p>{user.phone}</p>
                        </Typography>

                    </CardContent>

                </CardActionArea>
            </Card>
        </div>
    );
};

export default UserDetails;