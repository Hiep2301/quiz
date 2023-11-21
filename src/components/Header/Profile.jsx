import React, { useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Information from "./Information";
import ChangePassword from "./ChangePassword";
import History from "./History";

const Profile = ({ isShowProfile, setShowProfile }) => {
  const handleClose = () => setShowProfile(false);

  useEffect(() => {
    setShowProfile(isShowProfile);
  }, []);

  return (
    <>
      <Modal
        show={isShowProfile}
        onHide={handleClose}
        size="xl"
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Tabs
            defaultActiveKey="information"
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            <Tab eventKey="information" title="Information">
              <Information />
            </Tab>
            <Tab eventKey="changePassword" title="Change Password">
              <ChangePassword />
            </Tab>
            <Tab eventKey="history" title="History">
              <History />
            </Tab>
          </Tabs>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Profile;
