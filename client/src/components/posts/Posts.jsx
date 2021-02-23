import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPosts } from "../../actions/postActions";
import Spinner from "../layout/spinner/Spinner";
import PostItem from "./PostItem";

import "./posts.scss";
import PostForm from "./PostForm";

const Posts = ({ post: { posts, loading }, getPosts }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);
  return loading ? (
    <Spinner />
  ) : (
    <div className="posts">
      <div className="posts__inner">
        <div className="posts__inner__header">
          <h1>Posts</h1>
          <p>Welcome to the community</p>
        </div>
        <PostForm />
        <div className="posts__inner__footer">
          {posts.map((post) => (
            <PostItem post={post} key={post._id} />
          ))}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  post: state.postReducer,
});

Posts.propTypes = {
  post: PropTypes.object.isRequired,
  getPosts: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { getPosts })(Posts);
