import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { deleteUser } from "../../../services/apiService";

const ModalDeleteUser = ({
  isShowModalDeleteUser,
  setShowModalDeleteUser,
  dataUser,
  fetchDataListUsers,
  fetchDataListUsersWithPaginate,
  currentPage,
  setCurrentPage,
}) => {
  const handleClose = () => {
    setShowModalDeleteUser(false);
  };

  useEffect(() => {
    setShowModalDeleteUser(isShowModalDeleteUser);
  }, []);

  const handleDeleteUser = async () => {
    let data = await deleteUser(dataUser.id);
    if (data && data.EC === 0) {
      toast.success(`${data.EM}`);
      handleClose();
      // await fetchDataListUsers();
      setCurrentPage(1);
      await fetchDataListUsersWithPaginate(1);
    } else {
      toast.error(`${data.EM}`);
    }
  };

  return (
    <>
      <Modal
        show={isShowModalDeleteUser}
        onHide={handleClose}
        size="lg"
        backdrop="static"
        className="modal-delete-user"
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          do you want to delete user with email: {dataUser.email}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleDeleteUser}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalDeleteUser;
