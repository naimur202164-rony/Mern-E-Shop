import React , {useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import { 
    Row, 
    Col, 
    ListGroup, 
    Image, 
    Form, 
    Button, 
    Card 
} from 'react-bootstrap'
import { addToCart, removeFromCart } from '../actions/cartActions'

const CartScreen = ({ match, location, history }) => {

    const productID = match.params.id

    const qty = location.search ? Number(location.search.split('=')[1]) : 1

    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)

    const { cartItems } = cart

    useEffect(() => {
        if(productID){
            dispatch(addToCart(productID, qty))
        }
    }, [dispatch, productID, qty])

    const removeFromCartandler = (id) => {
        dispatch(removeFromCart(id))
    }
    const checkoutHandler = () => {
        history.push('/login?redirect=shipping')
    }

    return (
        <Row>
            <Col md={8} >
                <h1> Shopping Cart </h1>
                { 
                    cartItems.length === 0 
                    ? 
                    <Message variant="warning"> 
                        Your Cart is Empty 
                            <Link to='/'> Go Back </Link>
                    </Message> 
                    :
                    (
                        <ListGroup variant="fulsh">
                            { cartItems.map(item => (
                                <ListGroup.Item key={item.product}>
                                    <Row>
                                        <Col md={2} >
                                            <Image src={item.image} alt={item.name} fluid rounded/>
                                        </Col>
                                        <Col md={3}>
                                            <Link to={`/product/${item.product}`}> {item.name} </Link>
                                        </Col>
                                        <Col md={2} >
                                            $ {item.price}
                                        </Col>
                                        <Col md={2}>
                                                <Form.Control 
                                                    as="select"
                                                    size="md"
                                                    value={item.qty} 
                                                    custom
                                                    
                                                    onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}>
                                                    {
                                                        [...Array(item.countInStock).keys()].map((x) => (
                                                            <option 
                                                                key={x + 1} 
                                                                value={x + 1}
                                                            >
                                                                {x + 1}
                                                            </option>
                                                        ))
                                                    }    
                                                </Form.Control> 
                                        </Col>
                                        <Col md={2}>
                                            <Button
                                                type="button"
                                                variant="dark"
                                                onClick={() => removeFromCartandler(item.product)}
                                            >
                                                <i className="fas fa-trash"  />
                                            </Button>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    )
                }
            </Col>

            <Col md={4} >
                <Card>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2> Subtotal ({cartItems.reduce( (acc, item) => acc + item.qty, 0)}) items</h2> 
                            <h3>
                                $ {
                                    cartItems
                                        .reduce((acc, item) => acc + item.qty * item.price, 0)
                                        .toFixed(2)
                                    }
                            </h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button 
                                type="button" 
                                variant="dark"
                                className="btn-block" 
                                disabled={ cartItems.length === 0 }
                                onClick={checkoutHandler}
                                >
                                <i className="fas fa-shopping-basket">  Proceed To Checkout </i>    
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    )
}

export default CartScreen
