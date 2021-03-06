import React from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deletePost } from "../../actions/postActions";
import Spinner from "../layout/spinner/Spinner";

const PostComment = ({ loading, post }) => {
  const { name, text, date } = post;

  return loading || post === null ? (
    <Spinner />
  ) : (
    <div className="post__inner__footer__post">
      <div className="post__inner__footer__post__left">
        <Link to="/posts">
          <div className="post__inner__footer__post__left__picture">
            <div className="post__inner__footer__post__left__picture__container"></div>
          </div>
          <p>{name}</p>
        </Link>
      </div>
      <div className="post__inner__footer__post__right">
        <p className="post__inner__footer__post__right__text">{text}</p>
        <div className="post__inner__footer__post__right__bottom">
          <p>
            Posted on: <Moment format="YYYY/MM/DD">{date}</Moment>
          </p>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.authReducer,
});

PostComment.propTypes = {
  auth: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { deletePost })(PostComment);
