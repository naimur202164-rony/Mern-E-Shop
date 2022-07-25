import React from 'react'
import {Alert} from 'react-bootstrap'

const Message = ({variant, children}) => {

    return (
        <Alert variant={variant}>
          <Alert.Heading> <h2> {variant} </h2> </Alert.Heading>
          <hr />
            <p className="mb-0">
                {children} 
            </p>
        </Alert>
    )

}

Message.defaultProps = {
    variant: 'info'
}
    
export default Message


