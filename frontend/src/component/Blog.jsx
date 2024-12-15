import React from 'react'

export default function Blog(props) {
    const {index,blog}=props
  return (
    <li key={index}>{blog.blog_title}</li>
  )
}
