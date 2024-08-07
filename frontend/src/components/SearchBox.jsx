import React, { useState } from 'react'
import { Button, Form, } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

function SearchBox() {
    const [keyword, setKeyword] = useState('')

    let navigate = useNavigate()

    const submitHandler = (e) => {
        e.preventDefault()
        if (keyword) {
            navigate(`/?keyword=${keyword}&page=1`)
        } else {
            navigate(navigate(window.location.pathname))
        }
    }
    return (
        <Form onSubmit={submitHandler}>
            
       
            <input 
            placeholder='Search Items...'
            style={{padding: "10px ", width: "62%", borderRadius: "0px"}}
                type='text'
                name='q'
                onChange={(e) => setKeyword(e.target.value)}
                className='my-1'
                ></input>

                
               
            <Button
                type='submit'
                variant='outline-success'
                style={{margin: "3px 0px 6px 11px", padding:" 6px 7px"}}
                
                >
                search
            </Button>
                    
                   
                    
                
        </Form>
    )
}

export default SearchBox
