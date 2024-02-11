import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import { Button } from "react-bootstrap";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
const Blog = ({ title, desc, img, userid, isUser, id, onDelete }) => {
  const [Name, setName] = useState(null);
  const navigate = useNavigate();
  const UserUrl = process.env.REACT_APP_API_KEY_USER;
  const BlogUrl = process.env.REACT_APP_API_KEY_BLOG;

  const getsingleuser = async (userid) => {
    try {
      const res = await axios.get(`${UserUrl}getsingleuser/${userid}`);
      const data = await res.data;
      setName(data.user.name);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };
  const handleEdit = () => {
    navigate(`/updateblog/${id}`);
  };

  //   const deleteRequest = async () => {
  //     const res = await axios
  //       .delete(`${BlogUrl}${id}`)
  //       .catch((err) => console.log(err));
  //     const data = await res.data;
  //     return data;
  //   };
  const handleDelete = () => {
    onDelete(id)
      .then(() => navigate("/"))
      .then(() => navigate("/myblogs"));
  };
  useEffect(() => {
    getsingleuser(userid);
  }, []);

  return (
    <div>
      {" "}
      <Card
        sx={{
          width: "100%",
          margin: "auto",
          mt: 2,
          padding: 2,
          boxShadow: "5px 5px 10px #ccc",
          ":hover": {
            boxShadow: "10px 10px 20px #ccc",
          },
          "@media (min-width: 768px)": {
            // Media query for larger screens (tablet and above)
            width: "40%", // Adjusted width for larger screens
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
              {Name ? Name.charAt(0) : ""}
            </Avatar>
          }
          title={title}
        />
        <CardMedia component="img" height="194" image={img} alt="Paella dish" />

        <CardContent>
          <hr />
          <br />
          <Typography variant="body2" color="text.secondary">
            <b>{Name}</b> {": "} {desc}
          </Typography>
        </CardContent>
        <Button>
          <Link
            style={{ color: "white", textDecoration: "none" }}
            to={`/blog/${id}?isUser=${isUser}`}
          >
            See More
          </Link>
        </Button>
      </Card>
    </div>
  );
};

export default Blog;
