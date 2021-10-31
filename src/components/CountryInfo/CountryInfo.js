import { Button, Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import { maxHeight } from '@mui/system';
import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';


const CountryInfo = (props) => {
    const { name, website, id } = props.user;

   const history = useHistory();

   const handleClick = (id) => {
       history.push(`/users/${id}`)
   }

    return (
        <div className="col-md-3 p-3">
            <Card sx={{ maxWidth: 360}}>
                <CardActionArea>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            <h3>{name}</h3>
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {website}
                        </Typography>

                    </CardContent>

                </CardActionArea>
                <Link>
                <Button onClick={() => handleClick(id)} variant="contained" color="success">
                    Success
                </Button>
                </Link>
            </Card>
        </div>
    );
};

export default CountryInfo;