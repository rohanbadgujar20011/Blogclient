import axios from "axios";
import React, { useEffect, useState } from "react";
import Blog from "./Blog";
const Blogs = () => {
  const [blogs, setblogs] = useState();
  const [userId, setuserId] = useState(null);
  const BlogUrl = process.env.REACT_APP_API_KEY_BLOG;
  const sendRequest = async () => {
    console.log(BlogUrl);
    const res = await axios.get(`${BlogUrl}`).catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  const deleteBlog = async (blogId) => {
    try {
        await axios
        .delete(`${BlogUrl}${blogId}`)
      setblogs(blogs.filter((blog) => blog._id !== blogId));
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };
  useEffect(() => {
    sendRequest().then((data) => setblogs(data.blogs));
  }, []);

  return (
    <div>
      {blogs &&
        blogs.map((blog, index) => (
          <Blog
            id={blog._id}
            isUser={false}
            title={blog.title}
            onDelete={deleteBlog}
            desc={blog.desc.substring(0, 500)}
            img={blog.img}
            userid={blog.user}
            date={new Date(blog.date).toLocaleDateString()}
          />
        ))}
    </div>
  );
};

export default Blogs;
