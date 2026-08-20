import React, { useContext, useState } from "react";
import { AppBar, Avatar, Box, styled, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import logo from "../../assets/logo_text.png";
import { OnlyContext } from "../../context/Context";

import Menu from "./Menu";

const Component = styled(AppBar)`
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  height: 64px;
  padding: 0 35px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.08);
  color: #000;
`;

const ImageContainer = styled(Box)`
  display: flex;
  align-items: center;

  img {
    width: 125px;
    height: auto;
    display: block;
  }

`;

const Container = styled(Box)`
  display: flex;
  align-items: center;
  gap: 8px;

  & > a {
    position: relative;
    color: #444;
    padding: 10px 16px;
    text-decoration: none;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 0.3px;
    border-radius: 8px;
    transition: all 0.25s ease;
  }

  & > a:hover {
    color: #1976d2;
    background: rgba(25, 118, 210, 0.08);
  }
  & > a:focus {
    color: #26a738;
    background: rgb(62 210 25 / 8%);
  }
     @media (max-width: 612px) {
    display: none;
  }
`;

const ProfileContainer = styled(Box)`
  display: flex;
  align-items: center;
  margin-left: 20px;
 
`;

const ProfileAvatar = styled(Avatar)`
  width: 40px;
  height: 40px;
  font-size: 15px;
  font-weight: 700;
  background-color: #1976d2;
  cursor: pointer;
  // border: 2px solid white;
  // box-shadow: 0 3px 10px rgba(25, 118, 210, 0.3);
  transition: all 0.25s ease;

  &:hover {
    transform: scale(1.08);
    box-shadow: 0 5px 15px rgba(25, 118, 210, 0.4);
  }
`;

const handleLogout = () => {
  sessionStorage.removeItem("accessToken");
  sessionStorage.removeItem("refreshToken");
  sessionStorage.removeItem("username");
  sessionStorage.removeItem("name");
};

const Header = () => {
  const { accountDetails } = useContext(OnlyContext);
  const [menu, setMenu] = useState(false);

  const handleMenu = () => {
    setMenu((prev) => !prev);
  };

  return (
    <Component>
      {/* Logo */}
      <ImageContainer>
        <Link to="/">
          <img src={logo} alt="Logo" />
        </Link>
      </ImageContainer>

      {/* Navigation */}
      <Container>
        <Link to="/">HOME</Link>
        <Link to="/about">ABOUT</Link>
        <Link to="/contact">CONTACT</Link>
        <Link to="/login" onClick={handleLogout}>
          LOGOUT
        </Link>
      </Container>

      {/* Profile */}
      <ProfileContainer>
        <Box sx={{ position: "relative" }}>
          <Tooltip title={accountDetails?.username || "Profile"} arrow>
            <ProfileAvatar onClick={handleMenu}>
              {accountDetails?.username?.charAt(0).toUpperCase()}
            </ProfileAvatar>
          </Tooltip>

          <Menu menu={menu} setMenu={setMenu}/>
        </Box>
      </ProfileContainer>
    </Component>
  );
};

export default Header;
