/** @format */

import React from "react";

const ProductSkeleton = () => {
  return (
    <div className='bg-white rounded-lg border border-gray-100 flex flex-col overflow-hidden relative animate-pulse'>
      <div className='bg-gray-200 aspect-square w-full'></div>
      <div className='p-3 flex flex-col flex-1 gap-2 mt-1'>
        <div className='h-2 bg-gray-200 rounded w-1/3'></div>
        <div className='h-3 bg-gray-200 rounded w-3/4'></div>
        <div className='h-3 bg-gray-200 rounded w-1/2'></div>
        <div className='mt-auto flex justify-between items-center pt-2'>
          <div className='h-4 bg-gray-200 rounded w-1/4'></div>
          <div className='h-7 w-7 bg-gray-200 rounded-full'></div>
        </div>
      </div>
    </div>
  );
};

export default ProductSkeleton;
