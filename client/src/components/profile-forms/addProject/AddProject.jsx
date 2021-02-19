import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { addProject } from "../../../actions/profileActions";
import { connect } from "react-redux";

import "./addProject.scss";

const AddProject = ({ addProject, history }) => {
  const [formData, setFormData] = useState({
    title: "",
    genre: "",
    role: "",
    from: "",
    to: "",
    current: false,
    description: "",
  });

  const [toDateDisabled, toggleDisabled] = useState(false);

  const { title, genre, role, from, to, current, description } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    addProject(formData, history);
  };

  return (
    <div className="edit-project">
      <form className="edit-project__inner" onSubmit={handleSubmit}>
        <div className="edit-project__inner__title">
          <h1>Add a project</h1>
          <p>Lets get some info into your project</p>
          <p>* = required fields</p>
        </div>
        <div className="edit-project__inner__inputs">
          <div className="edit-project__inner__inputs__input">
            <input
              type="text"
              placeholder="Title*"
              name="title"
              value={title}
              onChange={handleChange}
            />
            <p>Whats title of song, album or other</p>
          </div>
          <div className="edit-project__inner__inputs__input">
            <input
              type="text"
              placeholder="Genre*"
              name="genre"
              value={genre}
              onChange={handleChange}
            />
            <p>
              What genre it belongs to (eg. Rock, Electro, Country,...) Please
              write in one value
            </p>
          </div>
          <div className="edit-project__inner__inputs__input">
            <select
              type="text"
              placeholder="Your role*"
              name="role"
              value={role}
              onChange={handleChange}
            >
              <option value="0">* Select Role</option>
              <option value="Author">Author</option>
              <option value="Contributer">Contributer</option>
              <option value="Writer">Writer</option>
              <option value="Covering a song">Covering a Song</option>
            </select>
            <p>Select one of presented</p>
          </div>
          <div className="edit-project__inner__inputs__input">
            <input
              type="date"
              name="from"
              value={from}
              onChange={handleChange}
            />
            <p>*Starting date or aproximate</p>
          </div>
          <div className="edit-project__inner__inputs__input__checkbox">
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
            <p>Current Project</p>
          </div>
          <div className="edit-project__inner__inputs__input">
            <input
              type="date"
              name="to"
              value={to}
              onChange={handleChange}
              disabled={toDateDisabled ? "disabled" : ""}
            />
            <p>Ending date or aproximate</p>
          </div>
          <div className="edit-project__inner__inputs__input">
            <textarea
              cols="30"
              rows="10"
              placeholder="A short description of project"
              name="description"
              value={description}
              onChange={handleChange}
            ></textarea>
          </div>
        </div>
        <div className="edit-project__inner__submit">
          <button type="submit" className="btn btn-black">
            Submit
          </button>
          <Link to="/dasboard" className="btn btn-orange">
            Go Back
          </Link>
        </div>
      </form>
    </div>
  );
};

AddProject.propTypes = {
  addProject: PropTypes.func.isRequired,
};

export default connect(null, { addProject })(withRouter(AddProject));
