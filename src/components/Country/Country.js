import React, { useEffect, useState } from 'react';
import CountryInfo from '../CountryInfo/CountryInfo'

const Contry = () => {
    const [country, setCountry] = useState([]);
  
    useEffect(() => {
        const url = 'https://jsonplaceholder.typicode.com/users';
        fetch(url)
        .then(res => res.json())
        .then(data => setCountry(data))
    }, [])
    return ( 
        <div className="row">
            {
                country.map(user => <CountryInfo user={user}></CountryInfo>)
            }
        </div>
    );
};

export default Contry;