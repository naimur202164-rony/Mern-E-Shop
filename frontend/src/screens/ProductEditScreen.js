import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { listProductDetails, updateProduct } from '../actions/productAction'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'


const ProductEditScreen = ({ match, history }) => {
  const productId = match.params.id

  const [name,  setName] = useState('')
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState('')
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('')
  const [countInStock, setCountInStock] = useState(0)
  const [rating, setRating] = useState(0)
  const [numReviews, setNumReviews] = useState(0)
  const [description, setDescription] = useState('')
  const [uploading, setUploading] = useState(false)
  
  const dispatch = useDispatch()

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails
  
  const productUpdate = useSelector((state) => state.productUpdate)
  const { loading: loadingUpdate, error:errorUpdate, success: successUpdate } = productUpdate

  useEffect(() => {
    if(successUpdate){
        dispatch({type: PRODUCT_UPDATE_RESET})
        history.push('/admin/productlist')
    }else{
        if (!product.name || product._id !== productId) {
            dispatch(listProductDetails(productId))
        } else {
            setName(product.name)
            setPrice(product.price)
            setImage(product.image)
            setBrand(product.brand)
            setCategory(product.category)
            setCountInStock(product.countInStock)
            setRating(product.rating)
            setNumReviews(product.numReviews)
            setDescription(product.description)
        }
    }
    
  }, [dispatch, history, productId, product , successUpdate])

  const uploadFileHandler = async (e) =>{
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)

    try {
        const config ={
          headers:{
            'Content-Type': 'multipart/form-data'
          }
        }
        
      const {data} = await axios.post('/api/upload', formData, config)

      setImage(data)
      setUploading(false)

    } catch (error) {
      console.log(error)
      setUploading(false)
    }
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        image,
        brand,
        category,
        description,
        countInStock,
      })
    )
  }

  return (
    <>
      <Link to='/admin/productlist' className='btn btn-light btn-sm my-3'>
        <i className="fas fa-arrow-alt-circle-left"> Go Back </i>
      </Link>
      <FormContainer>
        <h1> &nbsp;<i className="far fa-edit"></i> Edit Product </h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label><h2><b>Name</b></h2></Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='price'>
              <Form.Label>
                    <h2>
                      <i className="fas fa-hand-holding-usd">
                          <b>&nbsp; Price</b>
                        </i>
                    </h2>
                        </Form.Label>
              <Form.Control
                type='number'
                placeholder='Provide Price'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='image'>
            <Form.Label> 
                <h2>
                    <i className="fas fa-cloud-upload-alt">
                        <b>&nbsp;Image</b>
                    </i>
                </h2>
                </Form.Label>
              <Form.Control
                type='text'
                placeholder='Provide image URL'
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              <Form.File 
                id='image-file' 
                label='Choose file' 
                onChange={uploadFileHandler}
                custom
                className='btn btn-sm'></Form.File>
              {uploading && <Loader />}
            </Form.Group>

            <Form.Group controlId='brand'>
              <Form.Label>
                  <h2>
                    <i className="fas fa-tag">
                      <b>&nbsp; Brand</b>
                    </i>
                  </h2> 
                </Form.Label>
              <Form.Control
                type='text'
                placeholder='Provide Brand'
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='category'>
              <Form.Label>
                    <h2>
                      <b>Category</b>
                    </h2>
                  </Form.Label>
              <Form.Control
                type='text'
                placeholder='Provide category'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='countInStock'>
              <Form.Label>
                <h2>
                    <i className="fas fa-cubes">
                        <b>&nbsp; Count In Stock</b>
                    </i>
                </h2>
                </Form.Label>
              <Form.Control
                type='number'
                placeholder='Provide Count In Stock'
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='rating'>
              <Form.Label>
                    <h2>
                        <i className="fas fa-star-half-alt">
                            <b>&nbsp; Rating</b>
                        </i>
                    </h2>
                    </Form.Label>
              <Form.Control
                type='number'
                placeholder='Provide Rating'
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='description'>
              <Form.Label>
                  <h2>
                    <i className="fas fa-pen">
                      <b> &nbsp; Description</b>
                    </i>
                  </h2>
                  </Form.Label>
              <Form.Control
                type='text'
                placeholder='Provide Description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button  type='submit' className='btn btn-dark btn-sm' block>
                <h5>
                    <i className="fas fa-file-upload">
                        <b>&nbsp; Update</b>
                    </i> 
                </h5>
           </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default ProductEditScreen