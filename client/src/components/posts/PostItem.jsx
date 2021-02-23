import React from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addLike, removeLike, deletePost } from "../../actions/postActions";

const PostItem = ({
  post: { name, user, text, _id, likes, comments, date },
  auth,
  addLike,
  removeLike,
  deletePost,
}) => {
  return (
    <div className="posts__inner__footer__post">
      <div className="posts__inner__footer__post__left">
        <Link to={`/profile/${user}`}>
          <div className="posts__inner__footer__post__left__picture">
            <div className="posts__inner__footer__post__left__picture__container"></div>
          </div>
          <p>{name}</p>
        </Link>
      </div>
      <div className="posts__inner__footer__post__right">
        <p className="posts__inner__footer__post__right__text">{text}</p>
        <div className="posts__inner__footer__post__right__bottom">
          <div className="posts__inner__footer__post__right__bottom__react">
            <p>
              Posted on: <Moment format="YYYY/MM/DD">{date}</Moment>
            </p>
            <div className="posts__inner__footer__post__right__bottom__react__thumbs">
              <div
                className="posts__inner__footer__post__right__bottom__react__thumbs__like"
                onClick={() => addLike(_id)}
              ></div>
              <p>{likes.length > 0 && likes.length}</p>
              <div
                className="posts__inner__footer__post__right__bottom__react__thumbs__dislike"
                onClick={() => removeLike(_id)}
              ></div>
            </div>
          </div>
          <div className="posts__inner__footer__post__right__bottom__buttons">
            <Link to={`/posts/${_id}`} className="btn btn-red">
              Discussion {comments.length > 0 && comments.length}
            </Link>
            {!auth.loading && user === auth.user._id && (
              <div onClick={() => deletePost(_id)}>
                <span
                  className="iconify"
                  data-inline="false"
                  data-icon="ant-design:delete-outlined"
                  style={{ fontSize: "40px" }}
                ></span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.authReducer,
});

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(
  PostItem
);
