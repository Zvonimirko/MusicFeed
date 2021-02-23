import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addComment } from "../../actions/postActions";

const CommentForm = ({ postId, addComment }) => {
  const [text, setText] = useState("");

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addComment(postId, { text });
    setText("");
  };

  return (
    <form className="post__inner__main" onSubmit={handleSubmit}>
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

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
};

export default connect(null, { addComment })(CommentForm);
