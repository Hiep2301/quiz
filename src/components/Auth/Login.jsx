import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { postLogin } from "../../services/apiService";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { useDispatch } from "react-redux";
import { doLogin } from "../../redux/action/userAction";
import { ImSpinner10 } from "react-icons/im";
import Language from "../Header/Language";
import { useTranslation } from "react-i18next";

import "./Login.scss";

const Login = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { t } = useTranslation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmitLogin = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    let data = await postLogin(email, password);
    if (data && data.EC === 0) {
      dispatch(doLogin(data));
      toast.success(`${data.EM}`);
      setIsLoading(false);
      navigate("/");
    } else {
      toast.error(`${data.EM}`);
      setIsLoading(false);
    }
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <span>{t("login.header")}</span>
        <button
          className="btn-signup"
          onClick={() => {
            handleSignup();
          }}
        >
          {t("login.signup")}
        </button>
        <Language />
      </div>
      <div className="login-title col-4 mx-auto">{t("login.title")}</div>
      <div className="login-welcome col-4 mx-auto">{t("login.welcome")}</div>
      <form
        className="login-content-form col-4 mx-auto"
        onSubmit={(event) => {
          handleSubmitLogin(event);
        }}
      >
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label>{t("login.password")}</label>
          <div className="position-relative">
            <input
              type={isPasswordVisible ? "text" : "password"}
              className="form-control"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
            <span className="icon-hide-show" onClick={togglePasswordVisibility}>
              {isPasswordVisible ? <VscEyeClosed /> : <VscEye />}
            </span>
          </div>
        </div>
        <span className="forgot-password">{t("login.forgot")}</span>
        <div>
          <button type="submit" className="btn-login" disabled={isLoading}>
            {isLoading && <ImSpinner10 className="loader-icon" />}
            <span className="px-2">{t("login.title")}</span>
          </button>
        </div>
      </form>
      <div className="col-4 mx-auto">
        <span
          className="back"
          onClick={() => {
            navigate("/");
          }}
        >
          {t("login.back")}
        </span>
      </div>
    </div>
  );
};

export default Login;
