import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { postLogOut } from "../../services/apiService";
import { doLogout } from "../../redux/action/userAction";
import Language from "./Language";
import { useTranslation } from "react-i18next";
import Profile from "./Profile";
import { useState } from "react";

import "./Header.scss";

const Header = () => {
  const account = useSelector((state) => state.user.account);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { t, i18n } = useTranslation();

  const [showProfile, setShowProfile] = useState(false);

  const handleLogin = () => {
    navigate("/login");
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  const handleLogOut = async () => {
    let data = await postLogOut(account.email, account.refresh_token);
    if (data && data.EC === 0) {
      dispatch(doLogout());
      toast.success(`${data.EM}`);
      navigate("/");
    } else {
      toast.error(`${data?.EM}`);
    }
  };

  return (
    <>
      <Navbar expand="lg" className="navbar bg-body-tertiary">
        <Container>
          <NavLink to={"/"} className="navbar-brand">
            QUIZ
          </NavLink>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavLink to={"/"} className="nav-link">
                {t("header.home")}
              </NavLink>
              <NavLink to={"/user"} className="nav-link">
                {t("header.user")}
              </NavLink>
              <NavLink to={"/admin"} className="nav-link">
                {t("header.admin")}
              </NavLink>
            </Nav>
            <Nav>
              {!isAuthenticated ? (
                <>
                  <button
                    className="btn-login"
                    onClick={() => {
                      handleLogin();
                    }}
                  >
                    {t("header.login")}
                  </button>
                  <button
                    className="btn-signup"
                    onClick={() => {
                      handleSignup();
                    }}
                  >
                    {t("header.signup")}
                  </button>
                </>
              ) : (
                <NavDropdown
                  id="basic-nav-dropdown"
                  title={i18n.language === "en" ? "Settings" : "Cài đặt"}
                >
                  <NavDropdown.Item
                    className="p-2 px-3"
                    onClick={() => setShowProfile(true)}
                  >
                    {t("header.profile")}
                  </NavDropdown.Item>
                  <NavDropdown.Item className="p-2 px-3" onClick={handleLogOut}>
                    {t("header.logout")}
                  </NavDropdown.Item>
                </NavDropdown>
              )}
              <Language />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Profile isShowProfile={showProfile} setShowProfile={setShowProfile} />
    </>
  );
};

export default Header;
