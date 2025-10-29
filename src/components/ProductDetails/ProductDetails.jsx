import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { React, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function ProductDetails() {
  const { id, title, brand } = useParams();

const fetchProduct = async () => {
    const res = await axios.get(`https://dummyjson.com/products/${id}`);
    return res.data;
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["product", id],
    queryFn: fetchProduct,
  });

  if (isLoading) return <div className="text-center p-10">Loading...</div>;
  if (isError) return <div className="text-center text-red-600">{error.message}</div>;

    return <>
    <div className="p-10 max-w-3xl mx-auto">
      <img
        src={data.thumbnail}
        alt={data.title}
        className="w-full h-80 object-cover rounded-lg shadow-md"
      />
      <h1 className="text-3xl font-bold mt-5">{data.title}</h1>
      <p className="text-gray-700 mt-3">{data.description}</p>
      <p className="text-xl text-green-600 mt-2 font-semibold">Price: ${data.price}</p>

      <p className="mt-2 text-gray-500">
        <strong>Brand:</strong> {brand} <br />
        <strong>Title:</strong> {title}
      </p>

      <div className="flex gap-3 mt-4 flex-wrap">
        {data.images.slice(0, 4).map((img, index) => (
          <img
            key={index}
            src={img}
            alt={data.title}
            className="w-24 h-24 object-cover rounded border"
          />
        ))}
      </div>
    </div>
    </>
}