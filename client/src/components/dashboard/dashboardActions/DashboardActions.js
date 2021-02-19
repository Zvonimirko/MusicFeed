import React from "react";
import { Link } from "react-router-dom";

const DashboardActions = () => {
  return (
    <div className="dashboard__inner__left__main__edit">
      <Link to="/edit-profile" className="btn btn-black">
        Edit Profile
      </Link>
      <Link to="/add-project" className="btn btn-black">
        Add Project
      </Link>
      <Link to="/add-education" className="btn btn-black">
        Add Education
      </Link>
    </div>
  );
};

export default DashboardActions;
