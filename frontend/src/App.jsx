
import React, { useState, useEffect } from 'react';
import BlogsList from './component/BlogsList'

export default function App() {
  const [data, setData] = useState([]); // To store blogs
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchdata() {
      try {
        // Fetch all users
        const res = await fetch('http://localhost:3000/user/all_user');
        const users = await res.json();

        // Fetch blogs for each user
        const blogPromises = users.map(async (user) => {
          try {
            const blogRes = await fetch(
              `http://localhost:3000/blogs/get_blog_byUser/${user.user_id}`
            );
            const blogs = await blogRes.json();
            return blogs; // Return blogs for this user
          } catch (err) {
            console.error(`Failed to fetch blogs for user ${user.user_id}`, err);
            return []; // Return an empty array on failure
          }
        });

        // Wait for all blog fetches to complete
        const allBlogs = await Promise.all(blogPromises);
        const flattenedBlogs = allBlogs.flat(); // Flatten the array of arrays
        console.log('allBlogs ',allBlogs)
        console.log('flattenedBlogs ',flattenedBlogs)
        setData(flattenedBlogs); // Update the state with all blogs
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchdata();
  }, []);
  return (<>
  <BlogsList data={data} loading={loading} error={error}></BlogsList>
  </>
  )
}

