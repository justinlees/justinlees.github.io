import React from "react";
import { Form, useParams, useOutletContext, redirect } from "react-router-dom";
import axios from "axios";

export default function RequestPage() {
  const params = useParams();
  const userData = useOutletContext();
  const [lancerData, setLancerData] = React.useState([""]);

  return (
    <div className="requestPage">
      <h1>Task Description Page</h1>
      {userData.freelancer?.map((item) => {
        if (item.UserName !== params.fUser) {
          setLancerData(item);
        }
        return (
          <div>
            {item?.UserName}
            {item?.FirstName}
            {item?.LastName}
            {item?.MobileNo}
          </div>
        );
      })}

      <Form method="post">
        <input type="text" value={params.fUser} name="lancerId" />
        <input type="text" value={userData.user.UserName} name="clientId" />
        <input type="text" placeholder="TaskName" name="taskName" required />
        <input
          type="text"
          placeholder="Task Description...."
          name="taskDescription"
          required
        />
        <button type="submit">Request</button>
      </Form>
    </div>
  );
}

export async function Action({ params, request }) {
  const formData = Object.fromEntries(await request.formData());
  const res = await axios.post(
    `http://localhost:5500/home/${params.userId}/${params.fUser}/requestPage`,
    formData
  );
  if (res.data) return redirect(`/home/${params.userId}/tasks`);
}
