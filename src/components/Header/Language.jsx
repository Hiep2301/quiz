import React from "react";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useTranslation } from "react-i18next";

const Language = () => {
  const { i18n } = useTranslation();

  return (
    <>
      <NavDropdown
        className="ms-2"
        id="basic-nav-dropdown2"
        title={i18n.language === "en" ? "English" : "Việt Nam"}
      >
        <NavDropdown.Item
          className="p-2 px-3"
          onClick={() => i18n.changeLanguage("en")}
        >
          English
        </NavDropdown.Item>
        <NavDropdown.Item
          className="p-2 px-3"
          onClick={() => i18n.changeLanguage("vi")}
        >
          Việt Nam
        </NavDropdown.Item>
      </NavDropdown>
    </>
  );
};

export default Language;
