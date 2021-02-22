import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ProfileItem = ({
  profile: {
    user: { _id, name },
    status,
    location,
    instruments,
  },
}) => {
  const listInstruments = instruments.map((inst, index) => (
    <div
      key={index}
      className="profiles__inner__bottom__tag__items__right__instrument"
    >
      <p>{inst}</p>
      <span
        className="iconify"
        data-inline="false"
        data-icon="mdi:check"
        style={{ color: "#70dbc9", fontSize: "36px" }}
      ></span>
    </div>
  ));
  return (
    <div className="profiles__inner__bottom__tag">
      <div className="profiles__inner__bottom__tag__picture">
        <div className="profiles__inner__bottom__tag__picture__container"></div>
      </div>
      <div className="profiles__inner__bottom__tag__items">
        <div className="profiles__inner__bottom__tag__items__left">
          <h2>{name}</h2>
          <p>{status}</p>
          <p>{location}</p>
          <Link className="btn btn-black" to={`profile/${_id}`}>
            View Profile
          </Link>
        </div>
        <div className="profiles__inner__bottom__tag__items__right">
          {listInstruments}
        </div>
      </div>
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileItem;
