'use client'
import React, { useEffect, useState } from 'react'
import Navbar from './Navbar';
import Footer from './Footer';

interface ClientOnlyProps {
    children: React.ReactNode
}

const ClientOnly:React.FC<ClientOnlyProps> = ({children}) => {
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true)
    },[])

    if(!hasMounted){
        return null 
    }

  return (
    <>
    <Navbar/>
     {children} 
     <Footer/>
    </>
  )
}

export default ClientOnly