import React from "react";
import {
  useOutletContext,
  useParams,
  Form,
  Outlet,
  redirect,
} from "react-router-dom";
import axios from "axios";

export default function FMessages() {
  const freelancer = useOutletContext();
  const params = useParams();
  const [data, setData] = React.useState("");
  return (
    <div className="freelanceDetail">
      <div className="topHeader">
        <h1>Messages</h1>
      </div>
      <div className="briefDetails">
        <div className="block1">
          {freelancer.tasksAssigned?.map((item) => {
            if (item.clientId === params.userId) {
              return (
                <div>
                  <p>{item.clientId}</p>
                  <p>{item.taskName}</p>
                  <p>{item.taskDescription}</p>
                </div>
              );
            }
          })}
          <Outlet />
          <Form method="post">
            <input type="text" placeholder="message..." name="msgContent" />
            <button type="submit">Send</button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export async function Action({ request, params }) {
  const formData = Object.fromEntries(await request.formData());
  const response = await axios.post(
    `http://localhost:5500/freelancer/${params.fUser}/tasks/${params.userId}/messages`,
    formData
  );
  if (response.data) {
    return redirect(
      `/freelancer/${params.fUser}/tasks/${params.userId}/messages`
    );
  }
}
