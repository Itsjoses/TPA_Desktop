import React from 'react'
import { auth } from '../../database/firebase-Config'
import { signOut } from 'firebase/auth'
import { Link , useNavigate } from 'react-router-dom';

const Logout = () => {
    const Navigate = useNavigate()
    const logout = async() =>{
        try {
            
        } catch (error) {
            console.log(error.message);
        }
            
    }
  return (
    <div>

    </div>
  )
}

export default Logout
