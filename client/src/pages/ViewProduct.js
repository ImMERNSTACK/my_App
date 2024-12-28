import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { getProductById } from '../services/Apis';

function ViewProduct() {
    const [product,setProduct]=useState();
    const location=useLocation();
    const token = localStorage.getItem("userdbtoken");
    
    const fetchProducts= async ()=>{
        const response = await getProductById({id:location.state},{ Authorization: `Bearer ${token}` })
        setProduct(response.data.product);
        
    }

    useEffect(()=>{
        fetchProducts()
    })
     
  return (
    <div className="container py-5" style={{marginTop:'100px'}}>
      <div className="row">
        {/* Product Image */}
        <div className="col-md-6">
          <img src={`http://localhost:4000/${product?.thumbnail}`} alt={product?.title} className="img-fluid" />
        </div>
        <div className="col-md-6">
          <h1>{product?.title}</h1>
          <p className="text-muted">Price :{product?.price}</p>
          <p className="text-muted">Discount : {product?.discountPercentage}%</p>
          <h3> Total : {product?.discountedTotal}</h3>
          <button className="btn btn-primary">Add to Cart</button>
        </div>
      </div>
    </div>
    
  )
}

export default ViewProduct