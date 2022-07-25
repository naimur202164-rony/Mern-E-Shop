import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import CheckoutSteps from '../components/CheckoutSteps'
import {createOrder} from '../actions/orderActions'

const PlaceOrderScreen = ({ history }) =>{
    const dispatch = useDispatch()

    const cart  = useSelector(state => state.cart)

    const addDecimalsToPrice = (num) =>{
        return (Math.round(num * 100) / 100).toFixed(2)
    }

    // Calculate prices

    cart.itemsPrice = addDecimalsToPrice(cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0))
    cart.shippingPrice = addDecimalsToPrice(cart.itemsPrice > 100 ? 0 : 100)
    cart.taxPrice = addDecimalsToPrice(Number((0.023 * cart.itemsPrice ).toFixed(2)))
    cart.totalPrice = addDecimalsToPrice((Number(cart.itemsPrice)  + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2))
    // cart.paymentMethod
    

    const orderCreate = useSelector( state => state.orderCreate)
    const { order, success, error } = orderCreate

    useEffect(() =>{
        if(success){
            history.push(`/order/${order._id}`)
        }
        //eslint-disable-next-line
    }, [history, success, order])
 
    const placeOrderHandler = () =>{
        console.log('placeOrderHandler - invoiced')
        dispatch(
        createOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice: cart.itemsPrice,
            shippingPrice: cart.shippingPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice,
          })
        )
    }
    
    return (
        <>
           <CheckoutSteps step1 step2 step3 step4/> 
           <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item >
                            <h2> <b>Shipping To</b> </h2>
                                <p>
                                    <b> Address : 
                                            {cart.shippingAddress.address},{' '} 
                                            {cart.shippingAddress.city}{' '},
                                            {cart.shippingAddress.postalCode},{' '}
                                            {cart.shippingAddress.country}
                                    </b>
                                </p>
                        </ListGroup.Item>

                        <ListGroup.Item >
                            <h2> <b>Payment Method</b> </h2>
                                <p>
                                    <strong> Method : 
                                        {cart.paymentMethod}
                                    </strong>
                                </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2> <b> Orders </b> </h2>
                                {cart.cartItems.length === 0 ? 
                                <Message> Your cart is Empty </Message> : 
                                (
                                    <ListGroup variant='flush'>
                                        {cart.cartItems.map((item, index) => (
                                            <ListGroup.Item key={index} >
                                                <Row>
                                                    <Col md={1}>
                                                        <Image src={item.image} alt={item.name} fluid rounded />
                                                    </Col>
                                                    <Col>
                                                        <Link to={`/product/${item.product}`}><b>{item.name}</b></Link>
                                                    </Col>
                                                    <Col md={4}>
                                                      <b>{item.qty} x {item.price} = {item.qty * item.price} $</b> 
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                )
                            }
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2> <b>Order Summary</b> </h2>
                            </ListGroup.Item>                            
                            <ListGroup.Item>
                                <Row> 
                                    <Col> <b> Items </b></Col>
                                    <Col> <b> {cart.itemsPrice} $</b></Col>
                                </Row>
                            </ListGroup.Item>                            
                            <ListGroup.Item>
                                <Row> 
                                    <Col> <b> Shipping </b></Col>
                                    <Col> <b> {cart.shippingPrice} $</b></Col>
                                </Row>
                            </ListGroup.Item>                            
                            <ListGroup.Item>
                                <Row> 
                                    <Col> <b> Tax </b></Col>
                                    <Col> <b> {cart.taxPrice} $</b></Col>
                                </Row>
                            </ListGroup.Item>                            
                            <ListGroup.Item>
                                <Row> 
                                    <Col> <b> Total </b></Col>
                                    <Col> <b> {cart.totalPrice} $</b></Col>
                                </Row>
                            </ListGroup.Item> 
                              
                            <ListGroup.Item>
                                {error && <Message variant='danger'>Error : {error}</Message>}
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Button 
                                    type='button' 
                                    className='btn-block ' 
                                    // variant='ligth'
                                    variant='dark'
                                    // variant='success'
                                    // variant='primary'
                                    disabled={cart.cartItems === 0} 
                                    onClick={placeOrderHandler}
                                    > 
                                        Place Order
                                </Button>
                            </ListGroup.Item>                 
                        </ListGroup>
                    </Card>
                </Col>
           </Row>
        </>
    )
}

export default PlaceOrderScreen
