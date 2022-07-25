import React, { useState } from 'react'
import { withRouter } from 'react-router-dom' 
import { Form, Button } from 'react-bootstrap'
 
const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState('')
 
  const submithandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      history.push(`/search/${keyword}`)
    } else {
      history.push('/')
    }
  }
 
  return (
    <Form onSubmit={submithandler} inline>
      <Form.Control
        type='text'
        name='q'
        onChange={(e) => setKeyword(e.target.value)}
        placeholder='Search Products...'
        className='mr-sm-2 ml-sm-5'
      ></Form.Control>
      <Button 
        type='submit' 
        variant='outline-primary' 
        className='p-2'>
        Search
      </Button>
    </Form>
  )
}
 
export default withRouter(SearchBox) 