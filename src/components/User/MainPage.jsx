import React from "react";
import { useOutletContext, Link } from "react-router-dom";

export default function MainPage() {
  const userData = useOutletContext();
  return (
    <div className="MainPage">
      <div className="searchBar">
        <fieldset>
          <input type="search" placeholder="Search skills" />
          <button>Search</button>
        </fieldset>
      </div>

      <div className="freelancersDisplay">
        {userData.freelancer?.map((item) => (
          <div className="freelancerData">
            <div className="lancerDetails">
              <img alt="" />
              <h3>{item.UserName}</h3>
              <h3>{item.Rating}</h3>
              <h3>{item.Skill}</h3>
            </div>

            <Link to={`${item.UserName}/requestPage`}>view profile &rarr;</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
