import React from "react";
import Header from "../../components/header";
import FsideBar from "../../components/Freelancer/SideBar";
import { Outlet, useLoaderData, Navigate } from "react-router-dom";
import "../../styles/freelancer.css";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export default function FreeLanceDashBoard() {
  const pageContent = useLoaderData();

  return (
    <div className="freelanceDashBoard">
      {pageContent ? (
        <>
          <Header />
          <div className="mainContent">
            <FsideBar />
            <Outlet context={pageContent} />
          </div>
        </>
      ) : (
        <Navigate to="/login" replace={true} />
      )}
    </div>
  );
}

export async function Loader({ params }) {
  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  if (!token || decodedToken.data !== params.fUser) {
    return "";
  }

  try {
    const response = await axios.get(
      `http://localhost:5500/freelancer/${params.fUser}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );

    return response.data;
  } catch (error) {
    return "";
  }
}
