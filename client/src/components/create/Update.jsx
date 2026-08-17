
import {
  Box,
  styled,
  FormControl,
  InputBase,
  Button,
  TextareaAutosize,
  Tooltip,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { ImageUp } from "lucide-react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import { OnlyContext } from "../../context/Context";
import { getAccessToken } from "../../utils/common-utils";
import { ArrowBackIos } from "@mui/icons-material";

const Image = styled("img")`
  height: 50vh;
  width: 100%;
  object-fit: cover;
  border-radius: 15px;

  @media (max-width: 768px) {
    height: 35vh;
    border-radius: 10px;
  }

  @media (max-width: 480px) {
    height: 25vh;
    min-height: 180px;
    border-radius: 8px;
  }
`;

const Container = styled(Box)`
  margin: 0 100px;

  @media (max-width: 1024px) {
    margin: 0 50px;
  }

  @media (max-width: 768px) {
    margin: 0 25px;
  }

  @media (max-width: 480px) {
    margin: 0 12px;
  }
`;

const StyledFormControl = styled(FormControl)`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;

  @media (max-width: 600px) {
    flex-wrap: wrap;
    gap: 10px;
  }
`;

const UploadLabel = styled("label")`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;

  @media (max-width: 600px) {
    margin-left: 5px;
  }
`;

const StyledInputBase = styled(InputBase)`
  flex: 1;
  min-width: 0;
  font-size: 20px;
  margin: 0 30px;

  @media (max-width: 768px) {
    font-size: 18px;
    margin: 0 15px;
  }

  @media (max-width: 600px) {
    margin: 0 5px;
    width: calc(100% - 50px);
    flex: 1;
  }

  @media (max-width: 400px) {
    font-size: 16px;
  }
`;

const UpdateButton = styled(Button)`
  flex-shrink: 0;

  @media (max-width: 600px) {
    width: 100%;
    margin-top: 5px;
  }
`;

const StyledTextareaAutosize = styled(TextareaAutosize)`
  width: 100%;
  margin-top: 20px;
  resize: none;
  padding: 10px;
  box-sizing: border-box;
  font-size: 16px;
  font-family: inherit;
  border: 1px solid #ccc;
  border-radius: 6px;

  &:focus-visible {
    outline: none;
    border-color: #1976d2;
  }

  @media (max-width: 600px) {
    margin-top: 15px;
    font-size: 15px;
    padding: 8px;
  }
`;

const initialPost = {
  title: "",
  description: "",
  picture: "",
  username: "",
  categories: "",
  createdDate: new Date(),
};

const Update = () => {
  const [post, setPost] = useState(initialPost);
  const [file, setFile] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  const { accountDetails } = useContext(OnlyContext);
  const { id } = useParams();

  const BASE_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const token = getAccessToken();

    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/post/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        });

        const data = await response.json();

        if (response.ok) {
          setPost(data);
        }
      } catch (error) {
        console.log("Error fetching post:", error);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    if (!file) return;

    const getImage = async () => {
      const data = new FormData();

      data.append("name", file.name);
      data.append("file", file);

      const response = await fetch(`${BASE_URL}/file/upload`, {
        method: "POST",
        body: data,
      });

      const resData = await response.json();

      setPost((prev) => ({
        ...prev,
        picture: resData.imgUrl,
      }));
    };

    getImage();
  }, [file]);

  useEffect(() => {
    setPost((prev) => ({
      ...prev,
      categories: location.search?.split("=")[1] || "All",
      username: accountDetails?.username || "",
    }));
  }, [location.search, accountDetails?.username]);

  const handleFilechange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleChange = (e) => {
    setPost((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const updateBlogPost = async () => {
    const token = getAccessToken();

    const payload = {
      title: post.title?.trim(),
      description: post.description?.trim(),
      picture: post.picture || "",
      username: accountDetails?.username,
      categories: location.search?.split("=")[1] || "All",
    };

    const response = await fetch(`${BASE_URL}/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (response.ok) {
      navigate(`/details/${id}`);
    } else {
      console.error("Update post failed:", data);
    }
  };

  return (
    <>
    <Link to={`/details/${post._id}`}>
          <Tooltip title="Back to Post">
            <ArrowBackIos
              fontSize="small"
              className="m-4 ml-10 cursor-pointer transition-transform duration-1000 ease-in-out hover:-translate-x-2"
            />
          </Tooltip>
          
        </Link>
      <Container>
        <Image
          src={
            post.picture
              ? post.picture
              : "https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80"
          }
          alt="banner"
          title="Banner Image"
        />

        <StyledFormControl>
          <UploadLabel htmlFor="upload_image">
            <ImageUp color="#363636" size={25} />
          </UploadLabel>

          <input
            type="file"
            id="upload_image"
            onChange={handleFilechange}
            style={{ display: "none" }}
          />

          <StyledInputBase
            placeholder="Title"
            name="title"
            onChange={handleChange}
            value={post.title}
          />

          <UpdateButton
            variant="contained"
            onClick={updateBlogPost}
          >
            Update
          </UpdateButton>
        </StyledFormControl>

        <StyledTextareaAutosize
          onChange={handleChange}
          name="description"
          placeholder="Whats Up!..."
          minRows={5}
          value={post.description}
        />
      </Container>
    </>
  );
};

export default Update;
