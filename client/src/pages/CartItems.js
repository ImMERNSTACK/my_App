import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { removeItemFromCart } from '../services/Apis';

function CartItems() {
    const location=useLocation();
    const [cartItems, setCartItems] = useState([]);
    const token = localStorage.getItem("userdbtoken")
    const user_id = localStorage.getItem("user_id");
    const removeCartItem=async(Id)=>{
        const response=await removeItemFromCart({userId:user_id,productId:Id},{ Authorization: `Bearer ${token}` })
        console.log(response);
        setCartItems(cartItems.filter(item=>item._id !==Id));
    }
    useEffect(()=>{
       setCartItems(location.state);
    },[])
  return (
    <div><div className="cart-items d-flex flex-column align-items-center" style={{marginTop:'100px'}}>
    {cartItems.length === 0 ? (
      <p className='lead'>Your cart is empty</p>
    ) : (
      cartItems.map((item) => (
        <div className="card mb-3" key={item._id}>
          <div className="row g-0">
            <div className="col-md-4">
              <img src={`http://localhost:4000/${item.thumbnail}`} className="img-fluid rounded-start" alt={item.title} style={{height:'120px'}} />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">{item.title}</h5>
                <p className="card-text">${item.price}</p>
                {/* <p className="card-text">Quantity: 
                  <button onClick={() => handleQuantityChange(item._id, item.quantity - 1)}>-</button>
                  {item.quantity}
                  <button onClick={() => handleQuantityChange(item._id, item.quantity + 1)}>+</button>
                </p> */}
                <button className="btn btn-danger" onClick={()=>removeCartItem(item._id)}>
                  Remove from Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      ))
    )}
  </div></div>
  )
}

export default CartItems;