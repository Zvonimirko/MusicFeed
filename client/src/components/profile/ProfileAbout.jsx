import React from "react";
import PropTypes from "prop-types";

const ProfileAbout = ({
  profile: {
    bio,
    instruments,
    user: { name },
  },
}) => {
  return (
    <div className="profile__inner__main">
      {bio && (
        <>
          <h2>{`${name.trim().split(" ")[0]}s bio`}</h2>
          <p>{bio && <>{bio}</>}</p>
        </>
      )}

      <h2>Instruments</h2>
      <div className="profile__inner__main__instruments">
        {instruments.map((inst, idx) => (
          <div
            className="profile__inner__main__instruments__instrument"
            key={idx}
          >
            <p>{inst}</p>
            <span
              className="iconify ticks"
              data-inline="false"
              data-icon="mdi:check"
              style={{ color: "#70dbc9", fontSize: "36px" }}
            ></span>
          </div>
        ))}
      </div>
    </div>
  );
};

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileAbout;
