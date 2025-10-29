import React, { useState } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './components/Home/Home'
import Register from './components/Register/Register'
import Login from './components/Login/Login';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import ProductDetails from './components/ProductDetails/ProductDetails'

export default function App() {
  let query= new QueryClient();

    let route= createBrowserRouter([
  
        {index:true, element:<Home/>},
        {path:'/product-details/:id', element:<ProductDetails/>},
        {path:'register',element:<Register/>},
        {path:'login',element : <Login/>},
       

      
      
    ])
  return (
    <>
    <QueryClientProvider client={query}>
 <RouterProvider router={route}></RouterProvider>
 <ReactQueryDevtools />
 </QueryClientProvider>
    </>
  )
}

