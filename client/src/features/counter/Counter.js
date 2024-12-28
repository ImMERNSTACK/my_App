import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {  incrementByAmount, decrementByAmount } from './counterSlice';
function Counter() {
    
    const count = useSelector(state=>state.counter.value);
    const [amount,setAmount] = useState(1);
    const dispatch=useDispatch();
  return (
    <div>
       <input type="number" defaultValue={amount} onChange={(e)=>setAmount(Number(e.target.value))}/>
      <button
        aria-label="Increment value"
        onClick={() => dispatch(incrementByAmount(amount))}
      >
        Increment
      </button>
      <span>{count}</span>
      <button
        aria-label="Decrement value"
        onClick={() => dispatch(decrementByAmount(amount))}
      >
        Decrement
      </button>
    </div>
  
  )
}

export default Counter