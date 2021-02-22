import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

const ProfileProject = ({
  project: { title, from, to, role, description },
}) => {
  return (
    <div className="profile__inner__footer__container__details">
      <h3>{title}</h3>
      <p>
        <Moment format="YY/MM/DD">{from}</Moment> -{" "}
        {!to ? "Now" : <Moment format="YY/MM/DD">{to}</Moment>}
      </p>
      <p>
        <span>Role: </span>
        {role}
      </p>
      <p>
        <span>Description: </span>
        {description}
      </p>
    </div>
  );
};

ProfileProject.propTypes = {
  project: PropTypes.object.isRequired,
};

export default ProfileProject;
