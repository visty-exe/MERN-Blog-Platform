import React, { useState } from "react";
import Banner from "../banner/Banner";
import { Typography, Grid, Box, styled } from "@mui/material";
import Categories from "./Categories";
import Post from "./post/Posts";
import Small from "../../smallScMenu/Small";

const Home = () => {

  return (
    <>
      <div className="bg-gray-200">
        <Banner />
        <Grid container>
          <Grid size={{ xs: 12, sm: 2, lg: 2 }}>
            <Categories />
          </Grid>

          <Grid size={{ xs: 12, sm: 10, lg: 10 }}>
            <Post />
          </Grid>
        </Grid>

        {/* <Small/> */}
      </div>
    </>
  );
};

export default Home;
