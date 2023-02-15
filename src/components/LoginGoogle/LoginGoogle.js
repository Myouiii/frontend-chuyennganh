import { message } from 'antd';
import loginApi from '../../apis/loginApi';
import ggIcon from '../../assets/icon/gg-icon.png';
import constants from '../../constants/index';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import GoogleLogin from 'react-google-login';
import { gapi } from 'gapi-script';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import authReducers from '../../reducers/auth';
import './LoginGoogle.scss';
function LoginGoogle(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    function start() {
    gapi.auth2.init({
    clientId : process.env.REACT_APP_GOOGLE_CLIENT_ID,
    scope : ''
    })
    };
    gapi.load('client:auth2',start);
    });
  // xử lý khi đăng nhập thành công

  const onLoginSuccess = async (data) => {
    try {
      message.success('Đăng nhập thành công');
      // lưu refresh token vào local storage
      localStorage.setItem(constants.REFRESH_TOKEN, data.refreshToken);
      // Note: Lưu jwt vào localStorage nếu deploy heroku
      if (process.env.NODE_ENV === 'production')
        localStorage.setItem(constants.ACCESS_TOKEN_KEY, data.token);
      dispatch(authReducers.setIsAuth(true));
      setTimeout(() => {
        navigate('/');
      }, constants.DELAY_TIME);
    } catch (error) {
      message.error('Lỗi đăng nhập.');
    }
  };

  // login with Google
  const onLoginWithGoogle = async (res) => {
    try {
      console.log("res google: ", res);
      const { accessToken } = res;
      const response = await loginApi.postLoginWithGoogle({
        access_token: accessToken,
      })
      
      const { status, data } = response;
      //login success -> redirect home
      if (status === 200) {
        onLoginSuccess(data);
      }
    } catch (error) {
      console.log("err: ", error);
      if (error.response) {
        message.error(error.response.data.message);
      } else {
        message.error('Đăng nhập thất bại, thử lại');
      }
    }
  };
  
  return (
    <>
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        render={(renderProps) => (
          <div
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
            className={`${props.className} login-with gg login-input`}>
            <img src={ggIcon} className="login-with__icon " alt="ggIcon" />
            <span className="login-with__title">{props.title}</span>
          </div>
        )}
        onSuccess={onLoginWithGoogle}
        onFailure={onLoginWithGoogle}
        cookiePolicy={'single_host_origin'}
      />
    </>
  );
}

LoginGoogle.defaultProps = {
  title: 'Google+',
  className: '',
};

LoginGoogle.propTypes = {
  title: PropTypes.string,
  className: PropTypes.string,
};

export default LoginGoogle;
