import React from "react";
import {
  useOutletContext,
  Form,
  Link,
  redirect,
  Outlet,
} from "react-router-dom";
import axios from "axios";

export default function FTasks() {
  const freelancerData = useOutletContext();
  const [requestVal, setRequestVal] = React.useState("");

  return (
    <div className="freelanceDetail freelanceTasks">
      <div className="topHeader">
        <h1>Freelancer Tasks</h1>
      </div>

      <div className="briefDetails">
        {freelancerData.bufferRequests?.map((item) => (
          <div className="requestedClients block1">
            <h3>{item.clientIds}</h3>
            <div className="requestButtons">
              <button type="button" style={{ backgroundColor: "turquoise" }}>
                <Link to="taskInfo">Info</Link>
              </button>
              <Form className="clientRequestForm" method="post">
                <input
                  type="text"
                  value={requestVal}
                  name="requestVal"
                  style={{ display: "none" }}
                />
                <input
                  type="text"
                  name="clientIds"
                  value={item.clientIds}
                  style={{ display: "none" }}
                />
                <input
                  type="text"
                  value={item.taskName}
                  name="taskName"
                  style={{ display: "none" }}
                />
                <input
                  type="text"
                  name="taskDescription"
                  value={item.taskDescription}
                  style={{ display: "none" }}
                />
                <button
                  className="accept"
                  type="submit"
                  onClick={(e) => {
                    setRequestVal("accept");
                  }}
                >
                  Accept
                </button>
                <button
                  className="reject"
                  type="submit"
                  onClick={(e) => {
                    setRequestVal("reject");
                  }}
                >
                  Reject
                </button>
              </Form>
            </div>
            <Outlet context={item} />
          </div>
        ))}
        {freelancerData.tasksAssigned?.map((item) => (
          <div className="acceptedRequests block1">
            <h3>{item.clientId}</h3>
            <div className="acceptButtons">
              <button
                type="button"
                style={{
                  backgroundColor: "turquoise",
                  border: "none",
                  width: "5rem",
                  height: "2rem",
                  borderRadius: "6px",
                  margin: "0 2rem",
                }}
              >
                <Link
                  to="taskInfo"
                  style={{ color: "black", textDecoration: "none" }}
                >
                  Info
                </Link>
              </button>
              <button
                type="button"
                style={{
                  backgroundColor: "black",
                  border: "none",
                  width: "5rem",
                  height: "2rem",
                  borderRadius: "6px",
                  color: "white",
                  margin: "0 2rem",
                }}
              >
                <Link
                  to={`${item.clientId}/messages`}
                  style={{ color: "white", textDecoration: "none" }}
                >
                  Message
                </Link>
              </button>
            </div>
            <Outlet context={item} />
          </div>
        ))}

        <div className="block1">
          <div className="msgDisplay">Messages goes here</div>
          <Form className="FmsgForm" method="post">
            <input type="text" placeholder="message..." />
            <button type="button">Send</button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export async function Action({ request, params }) {
  const formData = Object.fromEntries(await request.formData());
  console.log(formData);
  const response = await axios.post(
    `http://localhost:5500/freelancer/${params.fUser}/tasks`,
    formData
  );
  console.log(response.data);
  if (response.data) {
    return redirect(`/freelancer/${params.fUser}/tasks`);
  }
}
