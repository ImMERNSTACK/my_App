import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { addToCart, get_Cart, getProducts } from '../services/Apis';
import { BackendURL } from '../services/helper';
import CartQuantity from './CartQuantity';

const Dashboard = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState();
  const [cart, setCart] = useState([]);
  const [cartQuantity, setCartQuantity] = useState(0);
  const location = useLocation();
  const token = localStorage.getItem("userdbtoken")
  const user_id = localStorage.getItem("user_id")
  const userValid = async () => {
    if (token) {
      console.log("user valid");
      const response = await getProducts({ Authorization: `Bearer ${token}` });
      setProducts(response.data.product);
    } else {
      navigate("*");
    }
  }
  const addtocart = async (productid) => {
    console.log(location.state);
    const response = await addToCart({ userId: user_id, productId: productid }, { Authorization: `Bearer ${token}` })
    console.log(response);
    await getCart();
  }

  const getCart = async () => {
    if (token) {
      const response = await get_Cart({ userId: user_id }, { Authorization: `Bearer ${token}` })
      setCart(response.data.data.cart);
    }
  }

  const isInCart = (productId) => {
    return cart.some(item => item._id === productId);
  };

  useEffect(() => {
    userValid();
    getCart();
    setCartQuantity(cart.length);
  }, [cart.length]);
  return <>
        <div className='' onClick={() => navigate('/cart_items',{state:cart})} style={{ marginTop: '100px', marginRight:'20px',display:'flex',justifyContent:'flex-end'}}>
           {cartQuantity>0 &&<CartQuantity quantity={cartQuantity}/>}
           <button className='btn btn-primary mt-5' onClick={()=>navigate("/add")}>Add Product</button>
       </div>
    <div className="section1 d-flex justify-content-center flex-wrap " style={{ marginTop: '0px' }}>
      {products?.map((item, index) => (
        <div className="card d-flex align-items-center " style={{ width: '20%', boxShadow: '10px 10px 5px lightblue' }} key={index}>
          <img src={`http://localhost:4000/${item.thumbnail}`} onClick={() => navigate('/view-product', { state: item._id })} style={{ width: '70%',height:'250px' }} className="card-img-top" />
          <div className="card-body d-flex justify-content-around" style={{ width: '100%' }}>
            <div>
              <h5 className="card-title">{item.title}</h5>
              <p className="card-text">{item.price}</p>
            </div>
            <div>
              <button
                className={`btn ${isInCart(item._id) ? 'btn-success' : 'btn-primary'}`}
                onClick={() => addtocart(item._id)}
                disabled={isInCart(item._id)}
              >
                  {isInCart(item._id) ? 'Added' : 'Add To Cart'}
              </button>
            </div>
          </div>
        </div>
      ))}
       
    </div>
  </>

}

export default Dashboard;