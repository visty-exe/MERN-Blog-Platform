import React, { useContext, useState } from "react";
import { Menu, Close } from "@mui/icons-material";
import { Box, styled } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { OnlyContext } from "../context/Context";

const Container = styled(Box)`
  position: fixed;
  bottom: 20px;
  right: 30px;
  display: none;
  z-index: 50;

  @media (max-width: 612px) {
    display: block;
  }
`;

const Small = () => {
  const [menuChange, setMenuChange] = useState(false);
  const { accountDetails } = useContext(OnlyContext);

  const navigate = useNavigate();

  const handleMenuClick = () => {
    setMenuChange((prev) => !prev);
  };

  const closeMenu = () => {
    setMenuChange(false);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("refreshToken");
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("name");

    setMenuChange(false);
    navigate("/login");
  };

  return (
    <div>
      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-[180px] 
        bg-blue-900 z-40 shadow-2xl
        transform transition-transform duration-300
        ${menuChange ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="p-6 text-white">

          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">
              Menu
            </h2>

            <Close
              onClick={closeMenu}
              className="cursor-pointer"
              sx={{
                color: "white",
                fontSize: 24,
              }}
            />
          </div>

          {/* Menu Items */}
          <div className="flex flex-col gap-3">

            <Link
              to="/"
              onClick={closeMenu}
              className="rounded-lg px-3 py-2 transition-all duration-200
              hover:bg-white/10"
            >
              Home
            </Link>

            <Link
              to="/about"
              onClick={closeMenu}
              className="rounded-lg px-3 py-2 transition-all duration-200
              hover:bg-white/10"
            >
              About
            </Link>

            <Link
              to="/contact"
              onClick={closeMenu}
              className="rounded-lg px-3 py-2 transition-all duration-200
              hover:bg-white/10"
            >
              Contact
            </Link>

            <Link
              to={`/myposts/${accountDetails.id}`}
              onClick={closeMenu}
              className="rounded-lg px-3 py-2 transition-all duration-200
              hover:bg-white/10"
            >
              My Posts
            </Link>

            <Link
              to={`/profile/${accountDetails.id}`}
              onClick={closeMenu}
              className="rounded-lg px-3 py-2 transition-all duration-200
              hover:bg-white/10"
            >
              Profile
            </Link>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="text-left cursor-pointer rounded-lg px-3 py-2
              text-red-300 transition-all duration-200
              hover:bg-red-500/20 hover:text-red-200"
            >
              Logout
            </button>

          </div>
        </div>
      </div>

      {/* Floating Menu Button */}
      <Container>
        <div
          onClick={handleMenuClick}
          className="shadow-xl w-12 h-12 rounded-full bg-blue-500
          flex justify-center items-center cursor-pointer
          hover:bg-blue-600 hover:scale-105
          transition-all duration-200"
        >
          {menuChange ? (
            <Close sx={{ color: "white" }} />
          ) : (
            <Menu sx={{ color: "white" }} />
          )}
        </div>
      </Container>
    </div>
  );
};

export default Small;