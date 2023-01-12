import React, { useEffect } from 'react'
import Carousel from "react-material-ui-carousel"
import Product from '../Home/Product'
import "./ProductDetails.css"
import {useSelector, useDispatch} from "react-redux"
import { getProductDetails } from '../../actions/productAction'

const ProductDetails = ({match}) => {
const dipatch = useDispatch()

useEffect(() =>{
    dispatchEvent(getProductDetails(match.params.id))
}, [dispatch, match.params.id])

  return (
    <Fragment>
        <div className='ProductDetails'>
            <div>
                <Carousel>
                    {product.iamges &&
                        product.images.map((item, i) => (
                            <img 
                                className='CarouselImage'
                                key={item.url}
                                src={item.url}
                                alt={`${i}Slide`}
                            />
                        ))}
                </Carousel>
            </div>
        </div>
    </Fragment>
  )
}

export default ProductDetails