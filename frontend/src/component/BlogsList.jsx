import React, { useState, useEffect } from 'react';
import Blog from './Blog';

export default function BlogsList(props) {
   // Empty dependency array to run once
   const {data,loading,error}=props
  if (loading) return <>Loading</>;
  if (error) return <>Error: {error}</>;

  return (
    <div>
      <ul>
        {data && data.map((blog, index) => (
          <Blog index={index} blog={blog}></Blog>
          
        ))}
      </ul>
    </div>
  );
}
