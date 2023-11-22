import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import _ from "lodash";
import { putUpdateUser } from "../../../services/apiService";

const ModalUpdateUser = ({
  isShowModalUpdateUser,
  setShowModalUpdateUser,
  dataUserUpdate,
  fetchDataListUsers,
  fetchDataListUsersWithPaginate,
  currentPage,
  setCurrentPage,
  resetDataUpdate,
}) => {
  const [imagePreview, setImagePreview] = useState("");
  const [image, setImage] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("USER");

  const handleClose = () => {
    setShowModalUpdateUser(false);
    setImagePreview("");
    setImage("");
    setUsername("");
    setEmail("");
    resetDataUpdate();
  };

  useEffect(() => {
    setShowModalUpdateUser(isShowModalUpdateUser);
  }, []);

  useEffect(() => {
    if (!_.isEmpty(dataUserUpdate)) {
      const { username, email, role, image } = dataUserUpdate;
      setUsername(username);
      setEmail(email);
      setRole(role);
      if (image) {
        setImage(`data:image/*;base64,${image}`);
        setImagePreview(`data:image/*;base64,${image}`);
      }
    }
  }, [dataUserUpdate]);

  const handleSubmitUser = async () => {
    if (!username) {
      toast.warn("Username is required!");
      return;
    }

    if (!image) {
      toast.warn("Image is required!");
      return;
    }

    let data = await putUpdateUser(dataUserUpdate.id, username, role, image);

    if (data && data.EC === 0) {
      toast.success(`${data.EM}`);
      handleClose();
      // await fetchDataListUsers();
      // setCurrentPage(1);
      await fetchDataListUsersWithPaginate(currentPage);
    } else {
      toast.error(`${data.EM}`);
    }
  };

  return (
    <>
      <Modal
        show={isShowModalUpdateUser}
        onHide={handleClose}
        size="lg"
        backdrop="static"
        className="modal-update-user"
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit user</Modal.Title>
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
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="inputAddress" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                id="inputAddress"
                placeholder="Username"
                value={username}
                required
                onChange={(event) => setUsername(event.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="inputRole" className="form-label">
                Role
              </label>
              <select
                id="inputRole"
                className="form-select"
                value={role}
                onChange={(event) => {
                  setRole(event.target.value);
                }}
              >
                <option value="USER">USER</option>
                <option value="ADMIN">ADMIN</option>
              </select>
            </div>
            <div className="col-md-12">
              <label htmlFor="inputImage" className="form-label">
                Image
              </label>
              <input
                type="file"
                className="form-control"
                aria-label="file image"
                required
                onChange={(event) => {
                  setImagePreview(URL.createObjectURL(event.target.files[0]));
                  setImage(event.target.files[0]);
                }}
                accept="image/*"
              />
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
          <Button variant="primary" onClick={handleSubmitUser}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalUpdateUser;
