import React from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deletePost } from "../../actions/postActions";

const PostComment = (props) => {
  return (
    <div className="post__inner__footer__post">
      <div className="post__inner__footer__post__left">
        <div className="post__inner__footer__post__left__picture">
          <div className="post__inner__footer__post__left__picture__container"></div>
        </div>
        <p>Zvonimir Horvat</p>
      </div>
      <div className="post__inner__footer__post__right">
        <p className="post__inner__footer__post__right__text">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut quasi
          commodi, sed cupiditate assumenda ipsam veritatis porro minus expedita
          vel architecto saepe aliquid, facilis magnam doloremque enim eligendi
          corrupti velit! Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Aut quasi commodi, sed cupiditate assumenda ipsam veritatis
          porro minus expedita vel architecto saepe aliquid, facilis magnam
          doloremque enim eligendi corrupti velit! Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Aut quasi commodi, sed cupiditate
          assumenda ipsam veritatis porro minus expedita vel architecto saepe
          aliquid, facilis magnam doloremque enim eligendi corrupti velit! Lorem
          ipsum dolor sit amet consectetur adipisicing elit. Aut quasi commodi,
          sed cupiditate assumenda ipsam veritatis porro minus expedita vel
          architecto saepe aliquid, facilis magnam doloremque enim eligendi
          corrupti velit! Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Aut quasi commodi, sed cupiditate assumenda ipsam veritatis
          porro minus expedita vel architecto saepe aliquid, facilis magnam
          doloremque enim eligendi corrupti velit! Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Aut quasi commodi, sed cupiditate
          assumenda ipsam veritatis porro minus expedita vel architecto saepe
          aliquid, facilis magnam doloremque enim eligendi corrupti velit!
        </p>
        <div className="post__inner__footer__post__right__bottom">
          <p>Posted on 11-11-2021</p>
          <span
            className="iconify"
            data-inline="false"
            data-icon="ant-design:delete-outlined"
            style={{ fontSize: "40px" }}
          ></span>
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
