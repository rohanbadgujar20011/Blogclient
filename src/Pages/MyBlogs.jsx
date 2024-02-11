import axios from "axios";
import React, { useEffect, useState } from "react";
import Blog from "./Blog";

const MyBlogs = () => {
  const userId = localStorage.getItem("user-data");
  const [user, setUser] = useState();
  const BlogUrl = process.env.REACT_APP_API_KEY_BLOG;
  const sendRequest = async () => {
    const res = await axios
      .get(`${BlogUrl}user/${userId}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    console.log(data.user.blogs);
    return data;
  };
  const deleteBlog = async (blogId) => {
    try {
      await axios.delete(`${BlogUrl}${blogId}`);
      const updatedBlogs = user.blogs.filter((blog) => blog._id !== blogId);

      setUser({
        ...user,
        blogs: updatedBlogs,
      });
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };
  useEffect(() => {
    sendRequest().then((data) => setUser(data.user));
  }, []);

  return (
    <div>
      {user &&
        user.blogs &&
        user.blogs.map((blog, index) => (
          <div key={index}>
            <Blog
              id={blog._id}
              onDelete={deleteBlog}
              isUser={true}
              title={blog.title}
              desc={blog.desc.substring(0, 300)}
              userid={userId}
              img={blog.img}
              userName={user.name}
            />
          </div>
        ))}
    </div>
  );
};

export default MyBlogs;
