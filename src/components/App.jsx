import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../style/index.css';
import Inventory from './Inventory';
import Register from './Register';
import Login from './Login';
import Singleitem from './Singleitem';
import Cart from './Cart';
import AdminCust from './admin/AdminCust';
import AdminInv from './admin/AdminInv';
import AdminCustEdit from './admin/AdminCustEdit';
import AdminCustCart from './admin/AdminCustCart';
import AdminInvEdit from './admin/AdminInvEdit';
import Navibar from './Navbar';
import OrderConfirmation from './OrderConfirmation';
import CheckoutForm from './CheckoutForm';


const App = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    
    <div>

      <Navibar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />;

      <Routes>
        <Route path="/login" element={<Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />;
        <Route path="/register" element={<Register />} />;
        <Route path="/" element={<Inventory />} />;
        <Route path="/mycart" element={<Cart />} />;
        <Route path="/checkout" element={<CheckoutForm />} />;
        <Route path="/completedorder" element={<OrderConfirmation />} />;
        <Route path="/single/:itemId" element={<Singleitem />} />;
        <Route path="/admin/customers/" element={<AdminCust />} />;
        <Route path="/admin/customers/:custId" element={<AdminCustEdit />} />;
        <Route path="/admin/customers/:custId/cart" element={<AdminCustCart />} />;
        <Route path="/admin/inventory/" element={<AdminInv />} />;
        <Route path="/admin/inventory/:invId" element={<AdminInvEdit />} />;
      </Routes>

    </div>
  );
};



export default App;
