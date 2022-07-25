import React, { useEffect} from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import {
    listProducts, 
    deleteProduct, 
    createProduct
} from '../actions/productAction'
import {PRODUCT_CREATE_RESET} from '../constants/productConstants'

const ProductListScreen = ({history, match}) => {

    const pageNumber = match.params.pageNumber || 1

    const dispatch = useDispatch()

    const productList = useSelector((state) => state.productList)
    const { loading, error, products, page, pages } = productList

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const productDelete = useSelector((state) => state.productDelete)
    const {
        loading: loadingDelete, 
        success: successDelete, 
        error: errorDelete 
    } = productDelete

    const productCreate = useSelector((state) => state.productCreate)
    const {
        loading: loadingCreate, 
        success: successCreate, 
        error: errorCreate,
        product: createdProduct
    } = productCreate

    useEffect(() =>{
        dispatch({type: PRODUCT_CREATE_RESET})

        if(!userInfo.isAdmin){
            history.push('/login')
        }
        if(successCreate) {
            history.push(`/admin/product/${createdProduct._id}/edit`)
        }else{
            dispatch(listProducts('', pageNumber))
        }
    }, [dispatch, history,userInfo, successCreate, successDelete, createdProduct, pageNumber])

    const deleteHandler = (id) =>{
        if(window.confirm('Are you sure ?')){
            dispatch(deleteProduct(id))  
        }
    }
    const createProductHandler = () =>{
        dispatch(createProduct())
    }

    return (
        <>
        <Row className='align-item-center'>
            <Col>
                <h1> <b>Products</b> </h1>
            </Col>
            <Col className='text-right'>
                <Button 
                    className='btn btn-md btn-light my-3' 
                    onClick={createProductHandler} > 
                        <i className='fas fa-plus'> 
                            <b> Create Product </b> 
                        </i> 
                </Button>
            </Col>
        </Row> 
        {loadingDelete && <Loader/> }
        {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
        {loadingCreate && <Loader/> }
        {errorCreate && <Message variant='danger'>{errorCreate}</Message>}                  
            {
                loading ? 
                <Loader/> : 
                error ? 
                <Message variant='danger'>{error}</Message> : (
                <>
                    <Table striped bordered hover responsive className='table-sm' variant='dark'>
                        <thead>
                            <tr>
                                <th><h5>ID</h5></th>
                                <th><h5>NAME</h5></th>
                                <th><h5>PRICE</h5></th>
                                <th><h5>CATEGORY</h5></th>
                                <th><h5>BRAND</h5></th>
                                <th><h5>ACTIONS</h5></th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(product =>
                                <tr key={product._id}>
                                    <td><h6>{product._id}</h6></td>
                                    <td><h6>{product.name}</h6></td>
                                    <td><h6>${product.price}</h6></td>
                                    <td><h6>{product.category}</h6></td>
                                    <td><h6>{product.brand}</h6></td>
                                    <td>
                                        <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                            <Button variant='light' className='btn-sm'>
                                                <i className="fas fa-user-edit"> Edit </i>
                                            </Button>
                                        </LinkContainer>
                                            <> &nbsp; </>
                                        <Button 
                                            variant='danger' 
                                            className='btn-sm' 
                                            onClick={()=>{deleteHandler(product._id)}}> 
                                                <i className='fas fa-trash'> Delete </i>
                                        </Button>
                                    </td>
                                </tr>
                                )}
                        </tbody>
                    </Table>
                    <Paginate  
                        pages={pages} 
                        page={page} 
                        isAdmin={true}
                    />
                </>
                )
            }
        </>
    )
}

export default ProductListScreen
