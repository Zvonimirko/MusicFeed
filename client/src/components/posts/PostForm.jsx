import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addPost } from "../../actions/postActions";

const PostForm = ({ addPost }) => {
  const [text, setText] = useState("");

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addPost({ text });
    setText("");
  };

  return (
    <form className="posts__inner__main" onSubmit={(e) => handleSubmit(e)}>
      <p>Leave a comment</p>
      <textarea
        name="text"
        value={text}
        cols="30"
        rows="10"
        placeholder="Comment on this post"
        onChange={handleChange}
      ></textarea>
      <button className="btn btn-purple" type="submit">
        Submit
      </button>
    </form>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
};

export default connect(null, { addPost })(PostForm);
