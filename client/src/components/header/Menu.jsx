import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { OnlyContext } from "../../context/Context";

const Menu = ({ menu, setMenu }) => {
  const navigate = useNavigate();
  const { accountDetails } = useContext(OnlyContext);

  const handleLogout = () => {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("refreshToken");
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("name");
    sessionStorage.removeItem("id");

    setMenu(false);
    navigate("/login");
  };

  const handleClose = () => {
    setMenu(false);
  };

  return (
    <>
      {menu && (
        <div className="absolute right-0 top-full mt-2 z-50 flex flex-col w-32 bg-white rounded-xl text-center p-3 gap-2 shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
          
          <Link
            onClick={handleClose}
            to={`/profile/${accountDetails.id}`}
            className="rounded-lg px-3 py-2 transition-all duration-200 hover:bg-gray-100"
          >
            Profile
          </Link>

          <hr className="border-gray-200" />

          <Link
            to="/posts"
            onClick={handleClose}
            className="rounded-lg px-3 py-2 transition-all duration-200 hover:bg-gray-100"
          >
            My Posts
          </Link>

          <hr className="border-gray-200" />

          <button
            onClick={handleLogout}
            className="cursor-pointer rounded-lg px-3 py-2 text-red-700 transition-all duration-200 hover:bg-red-500/20"
          >
            Logout
          </button>

        </div>
      )}
    </>
  );
};

export default Menu;