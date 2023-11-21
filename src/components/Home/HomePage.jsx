import React from "react";
import VideoHomePage from "../../assets/video-homepage.mp4";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import "./HomePage.scss";

const HomePage = () => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  const navigate = useNavigate();

  const { t } = useTranslation();

  return (
    <div className="homepage-container">
      <div className="hompage-video">
        <video autoPlay muted loop>
          <source src={VideoHomePage} type="video/mp4" />
        </video>
      </div>
      <div className="homepage-content">
        <div className="homepage-title">{t("homepage.title")}</div>
        <div className="homepage-subtitle">{t("homepage.subtitle")}</div>
        <div className="homepage-btn">
          {!isAuthenticated ? (
            <button onClick={() => navigate("/login")}>
              {t("homepage.start")}
            </button>
          ) : (
            <button onClick={() => navigate("/user")}>
              {t("homepage.doingQuiz")}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
