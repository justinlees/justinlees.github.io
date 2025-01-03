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
          <div className="topNav">
            <div className="left">
              <div>
                <NavLink
                  to="."
                  end
                  className={({ isActive }) => (isActive ? "activeTasks" : "")}
                >
                  Home
                </NavLink>
              </div>
              <div>
                <NavLink
                  to="tasks"
                  className={({ isActive }) => (isActive ? "activeTasks" : "")}
                >
                  Tasks
                </NavLink>
              </div>

              <div>
                <NavLink
                  to="profile"
                  className={({ isActive }) => (isActive ? "activeTasks" : "")}
                >
                  Profile
                </NavLink>
              </div>

              <div>
                <NavLink
                  to="payments"
                  className={({ isActive }) => (isActive ? "activeTasks" : "")}
                >
                  Payments
                </NavLink>
              </div>

              <div>
                <NavLink
                  to="settings"
                  className={({ isActive }) => (isActive ? "activeTasks" : "")}
                >
                  Settings
                </NavLink>
              </div>
            </div>
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
