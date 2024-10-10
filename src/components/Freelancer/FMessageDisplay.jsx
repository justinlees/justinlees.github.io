import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function FMessageDisplay() {
  const params = useParams();
  //const messages = useLoaderData();
  const [allMessages, setMessages] = React.useState("");
  React.useEffect(() => {
    axios
      .get(
        `http://localhost:5500/freelancer/${params.fUser}/tasks/${params.userId}/messages`
      )
      .then((res) => res)
      .then((data) => setMessages(data.data));
  });
  console.log(allMessages);
  //const sorted = allMessages?.allMessages;
  return (
    <div className="messageDisplay">
      <h1>Messages goes here</h1>
      {allMessages?.allMessages?.map((item) => {
        return (
          <div
            className={item.userId === params.fUser ? "lancerMsg" : "clientMsg"}
          >
            <span>{item.msgContent}</span>
          </div>
        );
      })}
    </div>
  );
}

// export async function Loader({ params }) {
//   const response = await axios.get(
//     `http://localhost:5500/freelancer/${params.fUser}/tasks/${params.userId}/messages`
//   );
//   if (response.data) {
//     return response.data;
//   }
// }
