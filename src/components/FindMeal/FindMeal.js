import React, { useEffect, useState } from 'react';

const FindMeal = () => {
    const [meal, setMeal] = useState({})

    useEffect(() => {
        const url = 'ww.themealdb.com/api/json/v1/1/search.php?f=a'
        fetch(url)
        .then(res => res.json())
        .then(data => console.log(data))
    }, [])
    return (
        <div>
            <h2>This is meal</h2>
        </div>
    );
};

export default FindMeal;