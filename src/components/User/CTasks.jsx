import React from "react";
import {
  useLoaderData,
  Link,
  Outlet,
  Form,
  redirect,
  useActionData,
} from "react-router-dom";
import axios from "axios";

export default function CTasks() {
  const requestedTasks = useLoaderData();
  const errors = useActionData();
  console.log(requestedTasks);
  return (
    <div className="ClientTasks">
      <h1>Tasks Page</h1>
      <div
        className="connections"
        style={{
          backgroundColor: "whitesmoke",
          width: "10rem",
        }}
      >
        {errors?.cancel && <span>{errors.cancel}</span>}
        {requestedTasks.bufferRequests?.map((item) => (
          <div>
            <h2>{item.taskName}</h2>
            <p>{item.taskDescription}</p>
            <Form>
              <input
                type="text"
                value={requestedTasks.UserName}
                name="UserName"
              />
              <input type="text" value={item.lancerIds} name="lancerIds" />
              <button type="submit">Cancel</button>
            </Form>
          </div>
        ))}
        {requestedTasks.tasksRequested?.map((item) => (
          <div>
            <p>{item.taskName}</p>
            <p>{item.taskDescription}</p>
            <Link to={`${item.lancerId}/messages`}>Message</Link>
          </div>
        ))}
      </div>
      <Outlet />
    </div>
  );
}

export async function Loader({ params }) {
  const res = await axios.get(
    `http://localhost:5500/home/${params.userId}/tasks`
  );
  return res.data;
}

export async function Action({ request, params }) {
  const formData = Object.fromEntries(await request.formData());
  const errors = {};
  const response = await axios.post(
    `http://localhost/home/${params.userId}/tasks`,
    formData
  );

  if (response.data === "requestCancel") {
    return redirect(`/home/${params.userId}/tasks`);
  } else {
    errors.cancel = "request Not processed. Try again.";
    return errors;
  }
}
