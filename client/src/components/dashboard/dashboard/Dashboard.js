import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  getCurrentProfile,
  deleteAccount,
} from "../../../actions/profileActions";
import Spinner from "../../layout/spinner/Spinner";
import PropTypes from "prop-types";

import "./dashboard.scss";
import DashboardActions from "../dashboardActions/DashboardActions";
import Project from "../project/Project";
import Education from "../education/Education";

const Dashboard = ({
  auth: { user },
  profile: { profile, loading },
  deleteAccount,
  getCurrentProfile,
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

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
                  <DashboardActions />
                  <Project projects={profile.projects} />
                  <Education education={profile.education} />
                </div>
                <button
                  className="btn btn-red"
                  type="button"
                  onClick={() => deleteAccount()}
                >
                  Delete My Account
                </button>
              </div>
              <div className="dashboard__inner__right">
                <div className="dashboard__inner__right__picture"></div>
              </div>
            </div>
          </>
        ) : (
          <div className="dashboard__no-account">
            <p>You have not yet setup a profile, please add some info</p>
            <Link to="/create-profile" className="btn">
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
  deleteAccount: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Dashboard
);
