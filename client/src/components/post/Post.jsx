import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../layout/spinner/Spinner";
import { getPost } from "../../actions/postActions";

import "./post.scss";
import PostComment from "./PostComment";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";

const Post = ({ getPost, post: { post, loading }, match }) => {
  useEffect(() => {
    getPost(match.params.id);
  }, [getPost, match.params.id]);

  return loading || post === null ? (
    <Spinner />
  ) : (
    <div className="post">
      <div className="post__inner">
        <PostComment post={post} loading={loading} />
        <CommentForm postId={post._id} />
        <div className="post__inner__footer">
          {post.comments.map((comment) => (
            <CommentItem
              key={comment._id}
              comment={comment}
              postId={post._id}
            />
          ))}
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
