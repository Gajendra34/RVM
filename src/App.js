import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Signup from './component/Signup';
import Login from './component/Login'
import Home from './component/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddProduct from './component/AddProduct';
import AddToCart from './component/AddToCart';
import CheckOut from './component/CheckOut';
import Contact from './component/Contact';
import Forgotpass from './component/Forgotpass';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/forgotpassword" element={<Forgotpass/>}></Route>
        <Route path="/addproduct" element={<AddProduct />}></Route>
        <Route path="/addtocart" element={<AddToCart />}></Route>
        <Route path="/checkout" element={<CheckOut />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
