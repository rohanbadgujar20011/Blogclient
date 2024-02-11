import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Blogs from "./Pages/Blogs";
import SingleBlog from "./Pages/SingleBlog";
import MyBlogs from "./Pages/MyBlogs";
import AddBlog from "./Pages/AddBlog";
import Update from "./Pages/Update";
const Allroute = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!isLoggedIn) {
  //     navigate("/");
  //   }
  // }, [isLoggedIn, navigate]);
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Blogs />} />
        <Route path="/blog/:id" element={<SingleBlog />} />
        {isLoggedIn ? (
          <>
            <Route path="/myblogs" element={<MyBlogs />} />
            <Route path="/addblog" element={<AddBlog />} />
            <Route path="/updateblog/:id" element={<Update />} />
          </>
        ) : null}
      </Routes>
    </div>
  );
};

export default Allroute;
