import React, { useContext } from "react";
import { OnlyContext } from "../../context/Context";
import { Button, styled } from "@mui/material";
import { ArrowForward, Person } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Button1 = styled(Button)`
  margin-top: 28px;
  width: 100%;
  padding: 12px 20px;
  border-radius: 12px;
  text-transform: none;
  font-size: 1rem;
  font-weight: 600;
  box-shadow: none;
  transition: all 0.25s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(25, 118, 210, 0.25);
  }
`;

const Profile = () => {
  const { accountDetails } = useContext(OnlyContext);
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/myposts/${accountDetails.id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-blue-50 to-gray-200 flex items-center justify-center px-5">

      <div className="w-full max-w-md">

        {/* Heading */}
        <div className="text-center mb-8">
          <div className="mx-auto mb-4 w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center shadow-lg">
            <Person sx={{ fontSize: 42, color: "white" }} />
          </div>

          <h1 className="text-3xl font-bold text-gray-800">
            Hello 👋, {accountDetails.name}
          </h1>

          <p className="mt-2 text-gray-500">
            Manage your profile and posts
          </p>
        </div>

        {/* Profile Card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white">

          {/* Profile Header */}
          <div className="flex items-center gap-4 pb-6 border-b border-gray-200">

            <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center">
              <Person className="text-blue-600" />
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-800">
                {accountDetails.name}
              </h2>

              <p className="text-gray-500">
                @{accountDetails.username}
              </p>
            </div>

          </div>

          {/* User Details */}
          <div className="mt-6 space-y-4">

            <div className="flex justify-between items-center bg-gray-50 rounded-xl px-4 py-3">
              <span className="text-gray-500 text-sm">
                Name
              </span>

              <span className="font-semibold text-gray-800">
                {accountDetails.name}
              </span>
            </div>

            <div className="flex justify-between items-center bg-gray-50 rounded-xl px-4 py-3">
              <span className="text-gray-500 text-sm">
                Username
              </span>

              <span className="font-semibold text-gray-800">
                @{accountDetails.username}
              </span>
            </div>

            <div className="flex justify-between items-center bg-gray-50 rounded-xl px-4 py-3">
              <span className="text-gray-500 text-sm">
                User ID
              </span>

              <span className="font-mono text-sm text-gray-700">
                {accountDetails.id}
              </span>
            </div>

          </div>

          {/* CTA */}
          <Button1
            variant="contained"
            endIcon={<ArrowForward />}
            onClick={handleNavigate}
          >
            See Your Posts
          </Button1>

        </div>

        <p className="text-center text-gray-400 text-sm mt-6">
          Your personal profile
        </p>

      </div>
    </div>
  );
};

export default Profile;