import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { useEffect, useState } from 'react';
import './App.css';
import Header from "./component/layout/Header/Header.js"
import WebFont from "webfontloader"
import React from 'react';
import Footer from "./component/layout/Footer/Footer.js"
import Home from "./component/Home/Home.js"
import Loader from './component/layout/Loader/Loader';
import ProductDetails from "./component/Product/ProductDetails.js"
import Products from "./component/Product/Products.js"
import Search from "./component/Product/Search.js"
import LoginSignUp from './component/User/LoginSignUp.js';
import store from "./store.js"
import { loadUser } from './actions/userAction';
import UserOptions from "./component/layout/Header/UserOptions.js"
import { useSelector } from 'react-redux';
import Profile from "./component/User/Profile.js"
import ProtectedRoute from './component/Route/ProtectedRoute';
import UpdatePassword from "./component/User/UpdatePassword.js"
import ForgotPassword from "./component/User/ForgotPassword.js"
import ResetPassword from "./component/User/ResetPassword.js"
import Cart from "./component/Cart/Cart.js"
import Shipping from "./component/Cart/Shipping.js"
import ConfirmOrder from "./component/Cart/ConfirmOrder.js"
import Payment from "./component/Cart/Payment.js"
import OrderSuccess from "./component/Cart/OrderSuccess.js"
import MyOrders from "./component/Order/MyOrders.js"
import axios from 'axios';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';


function App() {
  const{isAuthenticated, user} = useSelector((state) => state.user)

  const[stripeApiKey, setStripeApiKey] = useState("")

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey")

    setStripeApiKey(data.stripeApiKey)

  }

  useEffect(() => {
    WebFont.load({
      google:{
        families:["Roboto","Droid Sans", "Chilanka"]
      },
    });

    store.dispatch(loadUser())

    getStripeApiKey()
  }, [])

  return (
  <Router>
    <Header />
    {isAuthenticated && <UserOptions user={user} />}
    <Routes>
      
      <Route exact path="/" element={<Home />}/>
      <Route exact path="/product/:id" element={<ProductDetails />}/>
      <Route exact path="/products" element={<Products />}/>
      <Route path="/products/:keyword" element={<Products />}/>
      <Route exact path="/search" element={<Search />}/>
      

      <Route exact path="/account" element={<Profile />} />
      <Route exact path="/password/update" element={<UpdatePassword />} />
      <Route exact path="login/shipping" element={<Shipping />} />
      <Route exact path="/order/confirm" element={<ConfirmOrder />} />
      
      <Route exact path="/process/payment" element={<Elements stripe={loadStripe()}><Payment /></Elements>} />
      {/* {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
        </Elements>
      )} */}
      <Route exact path="/success" element={<OrderSuccess />} />
      <Route exact path="/orders" element={<MyOrders />} />

      <Route exact path="/password/forgot" element={<ForgotPassword />} />
      <Route exact path="/password/reset/:token" element={<ResetPassword />} />
      <Route exact path="/login" element={<LoginSignUp />}/>
      <Route exact path="/cart" element={<Cart />}/>


    </Routes>
    <Footer />
  </Router>
  );
}

export default App;
