import React, {useState} from 'react'
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import axios from 'axios'
import {IoMdSend} from 'react-icons/io'
import './Role.css'


const Role = ({role}) => {
    /* declare reactive variables */
    const [editing, setEditing] = useState()
    const [input, setInput] = useState('')
    const [isOpen, setIsOpen] = useState(false)

    const handleChange = (event) => {
        /*  handle the input change  and update the input var*/
        setInput(event.target.value)
    }

    const handleEdit = (event) => {
        /* function that submit the form to the backend */

        /* declare the url path and make a request using axios */
        if (input) {
            console.log('editing...')
            axios.put(`http://127.0.0.1:8000/api/roles/${role.id}`, {
                'name': input
            })
            .then(res => {
                /* if the request is successful, redirect to the home page */
                console.log(res)
                window.location.reload(false);
            })
            .catch(err => console.log(err))

        }
    }

    const handleDelete = (event) => {
        /* function that delete the role from the backend */

        /* declare the url path and make a request using axios */
        console.log('deleting...')
        axios.delete(`http://127.0.0.1:8000/api/roles/${role.id}`)
        .then(res => {

            /* if the request is successful, redirect to the home page */
            console.log(res)
            window.location.reload(false)})
        .catch(err => console.log(err))

        
    }

    return (
        <div className='role-form'>
            {!editing?
                <div className='role-content'>{role.name}</div> :
                <form className='role-form-edit'>
                    <input
                        type='text'
                        placeholder={role.name}
                        onChange={handleChange}
                        onClick={()=>{setIsOpen(!isOpen)}}
                    />
                </form>
            } 
            <div className='role-icons'>
                {!editing?
                    <button className='role-button' onClick={() => {setEditing(!editing)}}><AiFillEdit /></button> :
                    <button className='role-button' onClick={handleEdit} ><IoMdSend/></button>
                }
                <button className='role-button' onClick={handleDelete}><AiFillDelete /></button>
            </div>
        </div>
  )
}

export default Role