import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Otp from './pages/Otp';
import Error from './pages/Error';
import Headers from './components/Headers';
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import Counter from './features/counter/Counter';
import ProductForm from './pages/ProductForm';
import ViewProduct from './pages/ViewProduct';
import Cart from './pages/Cart';
import CartItems from './pages/CartItems';

function App() {
  return <>
  {/* <header class="position-fixed top-0 start-0 w-100 bg-dark text-white p-3 " style={{zIndex:1000}}>
    <h1 class="text-center">Fixed Header</h1>
  </header> */}
    <Headers />
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/dashboard' element={<Dashboard />} />      
      <Route path='/view-product' element={<ViewProduct />} />      
      <Route path='/user/otp' element={<Otp />} />
      <Route path='/counter' element={<Counter/>}/>
      <Route path='/add' element={<ProductForm/>}/>
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/cart_items' element={<CartItems/>}/>
      <Route path='*' element={<Error />} />
    </Routes>
  </>;
}

export default App;


