import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import axios from "axios";
import TextareaAutosize from "@mui/material/TextareaAutosize";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const labelStyles = { mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" };

const AddBlog = () => {
  const BlogUrl = process.env.REACT_APP_API_KEY_BLOG;
  const UserUrl = process.env.REACT_APP_API_KEY_USER;
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    imageURL: "",
  });
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const sendRequest = async () => {
    const res = await axios
      .post(`${BlogUrl}add`, {
        title: inputs.title,
        desc: inputs.description,
        img: inputs.imageURL,
        user: localStorage.getItem("user-data"),
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    console.log(data);

    return data;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest()
      .then((data) => console.log(data))
      .then(() => navigate("/"));
  };

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <Box
            borderRadius={10}
            boxShadow="10px 10px 20px #ccc"
            padding={3}
            margin={"auto"}
            marginTop={3}
            display="flex"
            flexDirection={"column"}
            width={"80%"}
          >
            <Typography
              padding={3}
              color="grey"
              variant="h2"
              textAlign={"center"}
            >
              Post Your Blog
            </Typography>
            <InputLabel sx={labelStyles}>Title</InputLabel>
            <TextField
              name="title"
              onChange={handleChange}
              value={inputs.title}
              margin="auto"
              variant="outlined"
            />
            <InputLabel sx={labelStyles}>Description</InputLabel>
            <TextareaAutosize
              name="description"
              onChange={handleChange}
              minRows={10}
              margin="auto"
              variant="outlined"
              value={inputs.description}
            />
            {/* <InputLabel sx={labelStyles}>ImageURL</InputLabel>
            <TextField
              name="imageURL"
              onChange={handleChange}
              value={inputs.imageURL}
              margin="auto"
              variant="outlined"

            /> */}
            <Button
              sx={{ mt: 2, borderRadius: 4 }}
              variant="contained"
              type="submit"
            >
              Submit
            </Button>
          </Box>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;
