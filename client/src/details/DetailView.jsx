import {
  Box,
  Typography,
  styled,
  Avatar,
  Divider,
  IconButton,
  Tooltip,
} from "@mui/material";

import React, { useState, useEffect, useContext } from "react";
import { OnlyContext } from "../context/Context";

import { useParams, Link, useNavigate } from "react-router-dom";

import { getAccessToken } from "../utils/common-utils";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Type } from "lucide-react";
import Comments from "./comments/Comments";
import { ArrowBackIos } from "@mui/icons-material";

const Page = styled(Box)`

  min-height: 100vh;
  padding: 10px 20px;
`;

const Container = styled(Box)`
  max-width: 1000px;
  margin: auto;
`;

const Article = styled(Box)`
  background: #fff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
`;

const HeroImage = styled("img")`
  width: 100%;
  height: 450px;
  object-fit: cover;

  @media (max-width: 768px) {
    height: 280px;
  }

  @media (max-width: 480px) {
    height: 220px;
  }
`;

const Content = styled(Box)`
  padding: 45px 70px;

  @media (max-width: 768px) {
    padding: 30px;
  }

  @media (max-width: 480px) {
    padding: 25px 20px;
  }
`;

const Category = styled(Typography)`
  display: inline-block;
  background: #e8f0fe;
  color: #1967d2;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 18px;
`;

const Title = styled(Typography)`
  font-size: 44px;
  font-weight: 700;
  line-height: 1.15;
  color: #1f2937;
  margin-bottom: 20px;
  word-break: break-word;

  @media (max-width: 768px) {
    font-size: 34px;
  }

  @media (max-width: 480px) {
    font-size: 28px;
  }
`;

const Meta = styled(Box)`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 30px;
`;

const AvatarBox = styled(Avatar)`
  width: 42px;
  height: 42px;
  background: #1976d2;
`;

const AuthorInfo = styled(Box)`
  display: flex;
  flex-direction: column;
`;

const Author = styled(Typography)`
  font-size: 15px;
  font-weight: 600;
  color: #333;
`;

const DateText = styled(Typography)`
  font-size: 13px;
  color: #888;
`;

/* ONLY NEW STYLES FOR EDIT / DELETE */

const Actions = styled(Box)`
  display: flex;
  gap: 8px;
  margin-left: auto;
`;

const EditButton = styled(IconButton)`
  width: 38px;
  height: 38px;
  color: #1976d2;
  background: #eaf3ff;
  border: 1px solid #cfe3ff;

  &:hover {
    background: #dcecff;
  }
`;

const DeleteButton = styled(IconButton)`
  width: 38px;
  height: 38px;
  color: #d32f2f;
  background: #fff0f0;
  border: 1px solid #ffd6d6;

  &:hover {
    background: #ffe0e0;
  }
`;

const Description = styled(Typography)`
  font-size: 18px;
  line-height: 1.9;
  color: #444;
  margin-top: 30px;
  white-space: pre-line;
  word-break: break-word;

  @media (max-width: 600px) {
    font-size: 16px;
    line-height: 1.8;
  }
`;

const DetailView = () => {
  const [post, setPost] = useState({});

  const { id } = useParams();

  const BASE_URL = import.meta.env.VITE_API_URL;
  const { accountDetails } = useContext(OnlyContext);

  const fallbackImage =
    "https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixlib=rb-1.2.1&w=1000&q=80";
  const navigate = useNavigate();

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

  const token = getAccessToken();
  const deleteBlog = async () => {
    try {
      const token = getAccessToken();

      const response = await fetch(`${BASE_URL}/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.ok) {
        navigate("/");
      } else {
        console.error("Delete failed:", data);
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };
  return (
    <>
      <div className="bg-[#f1f3f5] min-h-screen">
        <Link to="/">
          <Tooltip title="Back to Home">
            <ArrowBackIos
              fontSize="small"
              className="m-4 ml-10 cursor-pointer transition-transform duration-300 hover:-translate-x-2"
            />
          </Tooltip>
        </Link>
        <Page>
          <Container>
            <Article>
              {/* Hero Image */}

              <HeroImage src={post.picture || fallbackImage} alt={post.title} />

              <Content>
                {/* Category */}

                {post.category && <Category>{post.category}</Category>}

                {/* Title */}

                <Title>{post.title}</Title>

                {/* Author + Date */}

                <Meta>
                  <AvatarBox>
                    {post.username?.charAt(0)?.toUpperCase()}
                  </AvatarBox>

                  <AuthorInfo>
                    <Author>{post.username}</Author>

                    {post.createdAt && (
                      <DateText>
                        {new Date(post.createdAt).toDateString()}
                      </DateText>
                    )}
                  </AuthorInfo>

                  {/* EDIT + DELETE */}

                  <Actions>
                    {accountDetails.username === post.username && (
                      <>
                        <Tooltip title="Edit Post">
                          <Link to={`/update/${post._id}`}>
                            <EditButton>
                              <EditIcon fontSize="small" />
                            </EditButton>
                          </Link>
                        </Tooltip>

                        <Tooltip title="Delete Post">
                          <DeleteButton onClick={() => deleteBlog()}>
                            <DeleteIcon fontSize="small" />
                          </DeleteButton>
                        </Tooltip>
                      </>
                    )}
                  </Actions>
                </Meta>

                <Divider />

                {/* Blog Content */}

                <Description>{post.description}</Description>
                <Comments post={post} />
              </Content>
            </Article>
          </Container>
        </Page>
      </div>
    </>
  );
};

export default DetailView;
