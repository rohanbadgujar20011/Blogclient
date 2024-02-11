import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
  Button,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const SingleBlog = () => {
  const navigate = useNavigate();
  const [title, settitle] = useState("");
  const [desc, setdesc] = useState("");
  const [img, setimg] = useState("");
  const [user, setuser] = useState("");
  //   const [isUser, setisUser] = useState(isUseris);
  const { id, isUser } = useParams();
  console.log("is user is" + isUser);

  const BlogUrl = process.env.REACT_APP_API_KEY_BLOG;
  console.log(BlogUrl + " Blog page");
  const getblogdetail = async () => {
    const res = await axios.get(`${BlogUrl}${id}`);
    if (res.status == 200) {
      settitle(res.data.blog.title);
      setdesc(res.data.blog.desc);

      setimg(res.data.blog.img);
    }
  };

  const handleEdit = () => {
    navigate(`/updateblog/${id}`);
  };
  const deleteRequest = async () => {
    const res = await axios
      .delete(`${BlogUrl}${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  const handleDelete = () => {
    deleteRequest()
      .then(() => navigate("/"))
      .then(() => navigate("/myblogs"));
  };
  useEffect(() => {
    getblogdetail();
  }, []);

  return (
    <div>
      {" "}
      <Card
        sx={{
          width: "80%",
          margin: "auto",
          mt: 2,
          padding: 2,
          boxShadow: "5px 5px 10px #ccc",
          ":hover": {
            boxShadow: "10px 10px 20px #ccc",
          },
        }}
      >
        {isUser && (
          <Box display="flex">
            <IconButton onClick={handleEdit} sx={{ marginLeft: "auto" }}>
              <ModeEditOutlineIcon color="warning" />
            </IconButton>
            <IconButton onClick={handleDelete}>
              <DeleteForeverIcon color="error" />
            </IconButton>
          </Box>
        )}
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
              {user ? user.charAt(0) : ""}
            </Avatar>
          }
          title={title}
        />
        <CardMedia component="img" height="194" image={img} alt="Paella dish" />

        <CardContent>
          <hr />
          <br />
          <Typography variant="body2" color="text.secondary">
            {desc}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default SingleBlog;
