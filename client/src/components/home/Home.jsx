import React from "react";
import Banner from "../banner/Banner";
import { Typography, Grid } from "@mui/material";
import Categories from "./Categories";
import Post from "./post/Posts";

const Home = () => {
  return (
    <>
      <div className="bg-gray-200">
        <Banner />
      <Grid container>
        <Grid size={{ xs: 12, sm: 2, lg: 2 }}>
          <Categories />
        </Grid>

        <Grid size={{ xs: 12, sm: 10, lg: 10 }}><Post/></Grid>
      </Grid>
      </div>
    </>
  );
};

export default Home;
