import { Typography, Box, styled } from "@mui/material";
import React from "react";
import {OnlyContext} from "../../context/Context"
import { useContext } from "react";

const Image = styled(Box)`
  position: relative;
  width: 100%;
  height: 40vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  color: white;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    inset: 0;

    background: url(https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg)
      center/cover no-repeat #000;

    filter: blur(2px) brightness(50%);
    transform: scale(1.05);
  }
`;

const Content = styled(Box)`
  position: relative;
  z-index: 1;
  text-align: center;
`;

const Heading = styled(Typography)`
  font-size: 50px;
  line-height: 1;
  font-weight: bold;
  
`;

const SubHeading = styled(Typography)`
  font-size: 20px;
  color: #ffffff;
  margin-top: 10px;
  
`;

const Banner = () => {
  const {accountDetails} = useContext(OnlyContext)
  return (
    <Image>
      <Content>
        <Heading>Hi, {accountDetails.name} </Heading>
        <SubHeading >Welcome Back</SubHeading>
      </Content>
    </Image>
  );
};

export default Banner;