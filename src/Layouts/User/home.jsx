import React from "react";
import Header from "../../components/header";
import { useLoaderData, Navigate, Outlet, Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import "../../styles/home.css";

function Home() {
  const clientData = useLoaderData();

  return (
    <div className="HomePage">
      {clientData ? (
        <>
          <Header />
          <div className="topNav" style={{ zIndex: "5", marginTop: "5rem" }}>
            <Link to="." end>
              Home
            </Link>
            <Link to="tasks">Tasks</Link>
          </div>
          <Outlet context={clientData} />
        </>
      ) : (
        <Navigate to="/login" replace={true} />
      )}
    </div>
  );
}

export default Home;

export async function Loader({ params }) {
  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);

  if (!token || decodedToken.data !== params.userId) {
    return "";
  }
  try {
    const response = await axios.get(
      `http://localhost:5500/home/${params.userId}`,
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
