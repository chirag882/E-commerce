import React, { Fragment, useEffect } from 'react'
import {CgMouse} from "react-icons/cg"
import Product from "./Product.js"
import "./Home.css"
import MetaData from '../layout/MetaData'
import { getProduct } from '../../actions/productAction.js'
import {useSelector, useDispatch } from "react-redux"


const product={
  name: "Blue Tshirt",
  images: [{ url: "https://outoforder.in/wp-content/uploads/2020/03/Womens-Blue-T-shirt-1.jpg" }],
  price: "3000Rs",
  _id: "abhishek",
};

const Home = () => {
  const dispatch = useDispatch();

useEffect(() => {
  dispatch(getProduct())
}, [dispatch])


  return (
  <Fragment>
    <MetaData title="Ecommerce" />
    <div className='banner'>
      <p>Welcome to Ecommerce</p>
      <h1>FIND AMAZING PRODUCTS BELOW</h1>

      <a href="#container">
        <button>
          Scroll <CgMouse />
        </button>
      </a>

    </div>

    <h2 className='homeHeading'>Featured Products</h2>

    <div className='container' id='container'>
      <Product product={product} />
      <Product product={product} />
      <Product product={product} />
      <Product product={product} />
      
      <Product product={product} />
      <Product product={product} />
      <Product product={product} />
      <Product product={product} />
    </div>
  </Fragment>
  )
}

export default Home;