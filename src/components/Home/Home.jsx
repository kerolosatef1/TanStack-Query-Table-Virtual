import React, { useMemo, useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { Link } from "react-router-dom";
import useStateMangment from "../StateMangment/StateMangment";

export default function Home() {
  const { data, isPending, isError, error } = useStateMangment();
  const parentRef = useRef();
  const products = data?.products || [];

  const columns = useMemo(
    () => [
      { header: "Image", accessorKey: "thumbnail" },
      { header: "Title", accessorKey: "title" },
      { header: "Price", accessorKey: "price" },
      { header: "Brand", accessorKey: "brand" },
      { header: "Category", accessorKey: "category" },
    ],
    []
  );

  const table = useReactTable({
    data: products,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const rowVirtualizer = useVirtualizer({
  count: table.getRowModel().rows.length,
  getScrollElement: () => parentRef.current,
  estimateSize: () => {
    if (window.innerWidth < 640) {
     
      return 550;
    } else if (window.innerWidth < 1024) {
      
      return 300;
    } else {
      
      return 200;
    }
  },
  overscan: 20,
});

  if (isPending)
    return (
      <div className="flex justify-center items-center h-screen bg-black text-white">
        Loading...
      </div>
    );

  if (isError)
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        Error: {error.message}
      </div>
    );

  return (
    <div className="flex flex-col  h-screen bg-gray-100">
      {/* Header */}
      <header className="p-6 bg-green-600 text-white text-lg font-semibold shadow text-center">
        TanStack task ( Query + Table + Virtual)
      </header>


      <div className="flex-1  p-4 overflow-hidden">
        <div
          ref={parentRef}
          className="h-full  w-full overflow-auto space-y-4"
        >
          <div
            style={{
              position: "relative",
              height: `${rowVirtualizer.getTotalSize()}px`,
            }}
          >
            {rowVirtualizer.getVirtualItems().map((virtualRow) => {
              const row = table.getRowModel().rows[virtualRow.index];
              const product = row.original;

              return (
                <div
                  key={row.id}
                  className="absolute w-full flex  px-2"
                  style={{
                    transform: `translateY(${virtualRow.start}px)`,
                  }}
                >
              
                  <div
                    className="
                      w-full bg-white shadow-md border rounded-xl p-4 
                      flex flex-col md:flex-row md:items-center md:justify-between  gap-4                    "
                  >
                  
                    <div className="flex justify-center md:justify-start">
                      <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="w-40 h-40 object-cover rounded-md"
                      />
                    </div>
                   

                    {/* التفاصيل */}
                    <div className="flex-1 flex flex-col text-center md:text-left">
                        
                      <h2 className="text-lg md:text-xl font-semibold text-gray-800 break-words">
                        {product.title}
                      </h2>
                      <p className="text-gray-600">{product.brand}</p>
                      <p className="text-gray-500 text-sm">{product.category}</p>
                    </div>

                    {/* السعر */}
                    <div className="text-green-600 font-bold text-lg md:text-xl text-center md:text-right">
                      ${product.price}
                    </div>
                    <div className="flex justify-center md:justify-start">
                      <img
                        src={product.meta.qrCode}
                        alt={product.title}
                        className="w-40 h-40 object-cover rounded-md"
                      />
                    
                    
                    </div>
                  
                    
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
