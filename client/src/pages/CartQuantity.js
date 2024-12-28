import React from 'react'
import {Badge} from 'react-bootstrap'
function CartQuantity({ quantity }) {
  return (
    <div className="d-flex align-items-center justify-content-center position-fixed " style={{width:'100px',height:'100px',zIndex:100}}>
    <i className="bi bi-cart"></i> {/* Cart icon from Bootstrap Icons */}
    <Badge bg="danger" className="border rounded-5 w-75 h-75 d-flex align-items-center justify-content-center ">
      <h4>{quantity}</h4>
    </Badge>
  </div>
  )
}

export default CartQuantity;