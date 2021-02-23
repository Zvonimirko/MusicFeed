import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../layout/spinner/Spinner";
import { getPost } from "../../actions/postActions";

import "./post.scss";
import PostComment from "./PostComment";

const Post = ({ getPost, post: { post, loading }, match }) => {
  useEffect(() => {
    getPost(match.params.id);
  }, [getPost, match.params.id]);

  return loading ? (
    <Spinner />
  ) : (
    <div className="post">
      <div className="post__inner">
        <div className="post__inner__main">
          <p>Leave a comment</p>
          <textarea
            name="Comment on this post"
            id=""
            cols="30"
            rows="10"
            placeholder="Comment on this post"
          ></textarea>
          <button className="btn btn-purple">Submit</button>
        </div>
        <div className="post__inner__footer">
          <PostComment post={post} />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  post: state.postReducer,
});

Post.propTypes = {
  post: PropTypes.object.isRequired,
  getPost: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { getPost })(Post);
