import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteProject } from "../../../actions/profileActions";

const Project = ({ projects, deleteProject }) => {
  const allProjects = projects.map((prj) => (
    <tr key={prj._id}>
      <td>{prj.title}</td>
      <td>{prj.genre}</td>
      <td>{prj.role}</td>
      <td>
        <div onClick={() => deleteProject(prj._id)}>
          <span
            className="iconify"
            data-inline="false"
            data-icon="ant-design:delete-outlined"
            style={{ fontSize: "20px" }}
          ></span>
        </div>
      </td>
    </tr>
  ));

  return (
    <div className="dashboard__inner__left__main__projects">
      <h1>Projects</h1>
      <table style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Genre</th>
            <th>Role</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{allProjects}</tbody>
      </table>
    </div>
  );
};

Project.propTypes = {
  projects: PropTypes.array.isRequired,
  deleteProject: PropTypes.func.isRequired,
};

export default connect(null, { deleteProject })(Project);
