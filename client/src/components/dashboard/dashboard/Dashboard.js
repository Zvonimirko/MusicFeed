import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getCurrentProfile } from "../../../actions/profileActions";
import Spinner from "../../layout/spinner/Spinner";
import PropTypes from "prop-types";

import "./dashboard.scss";

const Dashboard = ({
  auth: { user },
  profile: { profile, loading },
  getCurrentProfile,
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, []);

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <>
      <div className="dashboard">
        <div className="dashboard__title">
          <h1>Dashboard</h1>
          <p>
            Welcome <span>{user && user.name}</span>
          </p>
        </div>
        {profile !== null ? (
          <>
            <div className="dashboard__inner">
              <div className="dashboard__inner__left">
                <div className="dashboard__inner__left__main">
                  <div className="dashboard__inner__left__main__edit">
                    <a href="edit-profile.html" className="btn btn-black">
                      Edit Profile
                    </a>
                    <a href="edit-project.html" className="btn btn-black">
                      Add Project
                    </a>
                    <a href="edit-education.html" className="btn btn-black">
                      Add Education
                    </a>
                  </div>
                  <div className="dashboard__inner__left__main__projects">
                    <h1>Projects</h1>
                    <table style={{ width: "100%" }}>
                      <thead>
                        <tr>
                          <th>Type</th>
                          <th>Title</th>
                          <th>Role</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Indie Rock</td>
                          <td>Alive</td>
                          <td>Frontman</td>
                          <td>
                            <span
                              className="iconify"
                              data-inline="false"
                              data-icon="ant-design:delete-outlined"
                              style={{ fontSize: "60px" }}
                            ></span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="dashboard__inner__left__main__education">
                    <h1>Education</h1>
                    <table style={{ width: "100%" }}>
                      <thead>
                        <tr>
                          <th>School</th>
                          <th>Instrument</th>
                          <th>Years</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Rock School</td>
                          <td>Guitar</td>
                          <td>4</td>
                          <td>
                            <span
                              className="iconify"
                              data-inline="false"
                              data-icon="ant-design:delete-outlined"
                              style={{ fontSize: "60px" }}
                            ></span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="dashboard__inner__right">
                <div className="dashboard__inner__right__picture"></div>
              </div>
            </div>
          </>
        ) : (
          <div className="dashboard__no-account">
            <p>You have not yet setup a profile, please add some info</p>
            <Link to="/create-profile" className="btn btn-purple">
              Create Profile
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  auth: state.authReducer,
  profile: state.profileReducer,
});

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
