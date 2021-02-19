import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { addEducation } from "../../../actions/profileActions";

import "./addEducation.scss";

const AddEducation = ({ addEducation, history }) => {
  const [formData, setFormData] = useState({
    school: "",
    areaofstudy: "",
    from: "",
    to: "",
    current: false,
    description: "",
  });

  const [toDateDisabled, toggleDisabled] = useState(false);

  const { school, areaofstudy, from, to, description, current } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    addEducation(formData, history);
  };

  return (
    <div className="edit-education">
      <form className="edit-education__inner" onSubmit={handleSubmit}>
        <div className="edit-education__inner__title">
          <h1>Add an education</h1>
          <p>Add any school od music courses you went to</p>
          <p>* = required fields</p>
        </div>
        <div className="edit-education__inner__inputs">
          <div className="edit-education__inner__inputs__input">
            <input
              type="text"
              placeholder="School*"
              name="school"
              value={school}
              onChange={handleChange}
            />
            <p>Name of School or University you went to</p>
          </div>
          <div className="edit-education__inner__inputs__input">
            <input
              type="text"
              placeholder="Area of study"
              name="areaofstudy"
              value={areaofstudy}
              onChange={handleChange}
            />
            <p>
              What have you studied?( eg. Music history, Djing, Percussion, etc)
              Please enter one value
            </p>
          </div>
          <div className="edit-education__inner__inputs__input">
            <input
              type="date"
              name="from"
              value={from}
              onChange={handleChange}
            />
            <p>*Starting date or aproximate</p>
          </div>
          <div className="edit-education__inner__inputs__input__checkbox">
            <input
              type="checkbox"
              name="current"
              checked={current}
              value={current}
              onChange={(e) => {
                setFormData({ ...formData, current: !current });
                toggleDisabled(!toDateDisabled);
              }}
            />
            <p>Current education</p>
          </div>
          <div className="edit-education__inner__inputs__input">
            <input
              type="date"
              name="to"
              value={to}
              onChange={handleChange}
              disabled={toDateDisabled ? "disabled" : ""}
            />
            <p>Ending date or aproximate</p>
          </div>
          <div className="edit-education__inner__inputs__input">
            <textarea
              cols="30"
              rows="10"
              placeholder="A short description of education"
              name="description"
              value={description}
              onChange={handleChange}
            ></textarea>
          </div>
        </div>
        <div className="edit-education__inner__submit">
          <button className="btn btn-black" type="submit">
            Submit
          </button>
          <Link to="/dashboard" className="btn btn-orange">
            Go Back
          </Link>
        </div>
      </form>
    </div>
  );
};

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired,
};

export default connect(null, { addEducation })(withRouter(AddEducation));
