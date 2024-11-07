import React from "react";
import Header from "../../components/header";
import {
  useLoaderData,
  Navigate,
  Outlet,
  NavLink,
  useSearchParams,
} from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import "../../styles/home.css";

function Home() {
  const clientData = useLoaderData();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("Skill");

  const filteredData = query
    ? clientData.freelancer?.filter((item) => {
        return item.Skill === query;
      })
    : clientData;
  return (
    <div className="HomePage">
      {filteredData ? (
        <>
          <Header />
          <div className="topNav" style={{ zIndex: "5", marginTop: "5rem" }}>
            <NavLink to="." end>
              Home
            </NavLink>
            <NavLink to="tasks">Tasks</NavLink>
            <NavLink>Profile</NavLink>
            <NavLink>Settings</NavLink>
            <NavLink>Payments</NavLink>
          </div>
          <div className="queryNav">
            <NavLink to="?Skill=Singer">Singers</NavLink>
            <NavLink to="?Rating=4.2">Rating&lt;4.0</NavLink>
          </div>
          <Outlet context={filteredData} />
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
