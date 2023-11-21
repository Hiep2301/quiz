import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import _ from "lodash";

const ModalUserDetails = ({
  isShowModalUserDetails,
  setShowModalUserDetails,
  dataUser,
}) => {
  const [imagePreview, setImagePreview] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("USER");

  const handleClose = () => {
    setShowModalUserDetails(false);
  };

  useEffect(() => {
    setShowModalUserDetails(isShowModalUserDetails);
  }, []);

  useEffect(() => {
    if (!_.isEmpty(dataUser)) {
      const { username, email, role, image } = dataUser;
      setUsername(username);
      setEmail(email);
      setRole(role);
      if (image) {
        setImagePreview(`data:image/*;base64,${image}`);
      }
    }
  }, [dataUser]);

  return (
    <>
      <Modal
        show={isShowModalUserDetails}
        onHide={handleClose}
        size="lg"
        backdrop="static"
        className="modal-user-details"
      >
        <Modal.Header closeButton>
          <Modal.Title>User details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-md-6">
              <label htmlFor="inputEmail" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="inputEmail"
                placeholder="Email"
                value={email}
                disabled
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="inputUsername" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                id="inputUsername"
                placeholder="Username"
                value={username}
                disabled
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="inputRole" className="form-label">
                Role
              </label>
              <input
                type="text"
                className="form-control"
                id="inputRole"
                placeholder="Role"
                value={role}
                disabled
              />
            </div>
            <div className="col-md-12">
              <label htmlFor="inputImage" className="form-label">
                Image
              </label>
              {imagePreview && (
                <div className="image-preview">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    style={{
                      margin: "10px",
                      maxWidth: "50%",
                      height: "auto",
                    }}
                  />
                </div>
              )}
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalUserDetails;
