import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { connect } from "react-redux";
import { deleteEducation } from "../../../actions/profileActions";

const Education = ({ education, deleteEducation }) => {
  const educations = education.map((edu) => (
    <tr key={edu._id}>
      <td>{edu.school}</td>
      <td>{edu.areaofstudy}</td>
      <td>
        <Moment format="YYYY/MM/DD">{edu.from}</Moment> -{" "}
        {edu.to === null ? (
          " Now"
        ) : (
          <Moment format="YYYY/MM/DD">{edu.to}</Moment>
        )}
      </td>
      <td>
        <div onClick={() => deleteEducation(edu._id)}>
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
    <div className="dashboard__inner__left__main__education">
      <h1>Education</h1>
      <table style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>School</th>
            <th>Area of study</th>
            <th>Years</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{educations}</tbody>
      </table>
    </div>
  );
};

Education.propTypes = {
  education: PropTypes.array.isRequired,
  deleteEducation: PropTypes.func.isRequired,
};

export default connect(null, { deleteEducation })(Education);
