import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { React, useEffect } from 'react';
export default function usestateMangment() {
async function recentProducts() {
    const res = await axios.get(`https://dummyjson.com/products?limit=100000000`)
    return res.data
}
   return useQuery({
    queryKey:['recentProducts'],
    queryFn:recentProducts,
    refetchInterval:7000,
    refetchIntervalInBackground:true,
   

   })
}
