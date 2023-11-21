import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { postSignup } from "../../services/apiService";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import Language from "../Header/Language";
import { useTranslation } from "react-i18next";

import "./Signup.scss";

const Signup = () => {
  const navigate = useNavigate();

  const { t } = useTranslation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleSubmitSignup = async (event) => {
    event.preventDefault();
    let data = await postSignup(email, password, username);
    if (data && data.EC === 0) {
      toast.success(`${data.EM}`);
      navigate("/login");
    } else {
      toast.error(`${data.EM}`);
    }
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className="signup-container">
      <div className="signup-header">
        <span>{t("signup.header")}</span>
        <button
          className="btn-login"
          onClick={() => {
            handleLogin();
          }}
        >
          {t("signup.login")}
        </button>
        <Language />
      </div>
      <div className="signup-title col-4 mx-auto">{t("signup.title")}</div>
      <div className="signup-welcome col-4 mx-auto">{t("signup.welcome")}</div>
      <form
        className="signup-content-form col-4 mx-auto"
        onSubmit={(event) => {
          handleSubmitSignup(event);
        }}
      >
        <div className="form-group">
          <label>{t("signup.username")}</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label>Email (*)</label>
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
          <label>{t("signup.password")} (*)</label>
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
        <div>
          <button type="submit" className="btn-signup">
            {t("signup.title")}
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
          {t("signup.back")}
        </span>
      </div>
    </div>
  );
};

export default Signup;
