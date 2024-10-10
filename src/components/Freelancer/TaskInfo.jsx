import React from "react";
import { useOutletContext, Link } from "react-router-dom";

export default function TaskInfo() {
  const taskInfo = useOutletContext();
  return (
    <div className="taskInfo">
      <section>{taskInfo?.taskName}</section>
      <section>{taskInfo?.taskDescription}</section>
      <Link to=".." relative="path">
        back
      </Link>
    </div>
  );
}
