import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { verifyToken } from '../../services/authServices'

const AuthContext = createContext();


export const AuthContext = ({children}) => {
  const [loading, setLoading] = useState(true)
  const [authenticated, setAuthenticated] = useState(false)
  const [user, setUser] = useState(null)

  //run once when app loades and verify token

  const verify = async ()=>{
    const response = await verifyToken();
    console.log(response);

  }
  

  

  useEffect(() => {

    try {

      verify()
     
      
    } catch (error) {
      console.log(error)
    }
    
  }, [])
  
  return (
    <>
    
    {children}
    </>
  )
}

 