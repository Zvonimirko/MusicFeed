import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

const ProfileEducation = ({
  education: { school, areaofstudy, from, to, description },
}) => {
  return (
    <div className="profile__inner__footer__container__details">
      <h3>{school}</h3>
      <p>
        <Moment format="YY/MM/DD">{from}</Moment> -{" "}
        {!to ? "Now" : <Moment format="YY/MM/DD">{to}</Moment>}
      </p>
      <p>
        <span>Area of study: </span>
        {areaofstudy}
      </p>
      <p>
        <span>Description: </span>
        {description}
      </p>
    </div>
  );
};

ProfileEducation.propTypes = {
  education: PropTypes.object.isRequired,
};

export default ProfileEducation;
