import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const Footer = () => {
    return (
    <footer style={{
        backgroundColor:'#f2ebeb',
        width: '100%'
    }}>
        <Container>
            <Row>
                <Col 
                    className="text-center py-3"
                    >
                    <strong>Copyright &copy; eProShop by Rostyslav L</strong>
                </Col>
            </Row>
        </Container>
    </footer>
    )
}

export default Footer
