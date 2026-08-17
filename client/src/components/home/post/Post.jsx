import { Box, Typography, styled, Button, Avatar } from "@mui/material";
import React from "react";
import { addElipsis } from "../../../utils/common-utils";
import { useNavigate } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const Container = styled(Box)`
  border: 1px solid #edeff2;
  border-radius: 16px;
  margin: 10px;
  height: 380px;
  overflow: hidden;
  box-sizing: border-box;
  background: #fff;
  display: flex;
  flex-direction: column;
  transition: all 0.25s ease;
  cursor: pointer;
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 12px 45px rgba(0, 0, 0, 0.1);
    border-color: #dde1e7;
  }
`;

const ImageWrap = styled(Box)`
  position: relative;
  height: 170px;
  flex-shrink: 0;
`;

const Image = styled("img")`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const Cat = styled(Typography)`
  position: absolute;
  top: 12px;
  left: 12px;
  padding: 5px 12px;
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(4px);
  color: #4f46e5;
  font-family: "Inter", sans-serif;
  font-size: 11px;
  font-weight: 700;
  text-transform: capitalize;
  letter-spacing: 0.2px;
`;

const Content = styled(Box)`
  padding: 16px 16px 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
`;

const Heading = styled(Typography)`
  font-size: 17px;
  font-weight: 700;
  line-height: 1.3;
  color: #1a1a1a;
  margin-bottom: 8px;
`;

const AuthorRow = styled(Box)`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
`;

const AuthorAvatar = styled(Avatar)`
  width: 20px;
  height: 20px;
  font-size: 11px;
  background: #4f46e5;
`;

const SubHeading = styled(Typography)`
  font-size: 12.5px;
  color: #888;
  font-weight: 500;
`;

const Desc = styled(Typography)`
  font-size: 13px;
  color: #5c5f66;
  line-height: 1.6;
  overflow-wrap: anywhere;
`;

const ButtonStyle = styled(Button)`
  margin: auto 16px 16px;
  border-radius: 8px;
  text-transform: none;
  font-weight: 600;
  font-size: 13px;
  padding: 8px 14px;
  justify-content: space-between;

  &:hover {
    background: #f3f2ff;
  }
`;

const Post = ({ post, id }) => {
  const navigate = useNavigate();
  const fallbackImage =
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=752&q=80";

  return (
    <Container onClick={() => navigate(`/details/${id}`)}>
      {/* Blog Image */}
      <ImageWrap>
        <Image src={post.picture || fallbackImage} alt="Blog" />
        <Cat>{post.categories || "General"}</Cat>
      </ImageWrap>

      {/* Blog Content */}
      <Content>
        <Heading>{addElipsis(post.title, 45)}</Heading>

        <AuthorRow>
          <AuthorAvatar>
            {post.username?.charAt(0)?.toUpperCase() || "U"}
          </AuthorAvatar>
          <SubHeading>{post.username}</SubHeading>
        </AuthorRow>

        <Desc>{addElipsis(post.description, 65)}</Desc>
      </Content>

      {/* Open Button */}
      <ButtonStyle
        variant="text"
        color="primary"
        endIcon={<ArrowForwardIcon fontSize="small" />}
        onClick={(e) => {
          e.stopPropagation();
          navigate(`/details/${id}`);
        }}
      >
        Read More
      </ButtonStyle>
    </Container>
  );
};

export default Post;