import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { deleteComment } from "../../actions/postActions";

const CommentItem = ({
  comment: { _id, text, name, user, date },
  postId,
  auth,
  deleteComment,
}) => {
  return (
    postId && (
      <div className="post__inner__footer__post">
        <div className="post__inner__footer__post__left">
          <Link to={`/profile/${user}`}>
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
            {!auth.loading && user === auth.user._id && (
              <div onClick={() => deleteComment(postId, _id)}>
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
    )
  );
};

const mapStateToProps = (state) => ({
  auth: state.authReducer,
});

CommentItem.propTypes = {
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { deleteComment })(CommentItem);
