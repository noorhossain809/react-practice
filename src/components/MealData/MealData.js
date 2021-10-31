import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';

const MealData = () => {
    const [search, setSearch] = useState('')
    const [meals, setMeals] = useState([])

    useEffect(() => {
        console.log('api calling')
        const url = `www.themealdb.com/api/json/v1/1/lookup.php?i=52772`
        fetch(url)
        .then(res => res.json())
        .then(data => console.log(data))
    }, [])

    const handleChange = event => {
        setSearch(event.target.value)
    }

    
    return (
        <div className="mb-5">
        <div className="py-3"  style={{backgroundColor: '#d7ccc8'}}>
            <div className="align-items-center justify-content-center">
            <h2>This is meal data</h2>
            <Paper
            className="m-3 align-items-center" 
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
    >
      <IconButton sx={{ p: '10px' }} aria-label="menu">
        <MenuIcon />
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        onChange={handleChange}
        placeholder="Search Meals"
        inputProps={{ 'aria-label': 'search Meals' }}
      />
      <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
        <DirectionsIcon />
      </IconButton>
    </Paper>
    </div>
        </div>
        <div className="text-center">
        <p>Find search : {search}</p>
        <p>Find Meals : {meals.length}</p>

        </div>
        
        </div>
    );
};

export default MealData;