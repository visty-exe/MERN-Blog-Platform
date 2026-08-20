import React, { useState } from "react";
import Login from "./components/accounts/Login";
import { Box, Toolbar } from "@mui/material";
import ContextProvider from "./context/Context";
import Home from "./components/home/Home";
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import Header from "./components/header/header";
import CreatePost from "./components/create/CreatePost";
import DetailView from "./details/DetailView";
import Update from "./components/create/Update";
import About from "./components/about/About"
import Contact from "./components/contact/Contact";
import Profile from "./components/profile/Profile";
import MyPosts from "./components/myposts/MyPosts"
import Small from "./smallScMenu/Small";

const PrivateRoute = () => {
  const token = sessionStorage.getItem("accessToken");


  return token ? (
    <>
      <Header />
      <Small/>
      <Toolbar />
      <Outlet />
      
    </>
  ) : (
    <Navigate to="/login" replace />
  );
};

const App = () => {
  return (
    <>
      <ContextProvider>
        <BrowserRouter>
          <Routes>
            <Route
              path="/login"
              element={<Login />}
            />
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<Home />} />
              <Route path="/create" element={<CreatePost />} />
              <Route path="/about" element={<About />} /> 
              <Route path="/contact" element={<Contact />} /> 
              <Route path="/details/:id" element={<DetailView />} />
              <Route path="/update/:id" element={<Update />} />
              <Route path="/profile/:id" element={<Profile />} />
              <Route path="/myposts/:id" element={<MyPosts />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ContextProvider>
    </>
  );
};

export default App;
