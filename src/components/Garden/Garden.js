import React from "react";
import CountryInfo from "../CountryInfo/CountryInfo";
import './Garden.css'

const Garden = (props) => {
  const { first_name, email, image, } = props.garden;
  const handleAdd = props.handleAdd;
  return (
      <div className="col-md-3">
      <div className="">
          <div className="">
          <div class="card">
          <img src={image} class="card-img-top img-fluid" alt="..." />
          <div class="card-body">
            <h5 class="card-title">{first_name}</h5>
            <p class="card-text">{email}</p>
            
            <button onClick={() => handleAdd(props.garden)}  class="btn btn-primary">
              Go somewhere
            </button>
          </div>
        </div>
          </div>
          <div className="col-md-4">
            <h2>{}</h2>
          </div>
        

    </div>
    
    </div>
  );
};

export default Garden;
