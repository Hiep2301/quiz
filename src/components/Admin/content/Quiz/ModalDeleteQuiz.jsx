import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { deleteQuiz } from "../../../../services/apiService";

const ModalDeleteQuiz = ({
  isShowModalDeleteQuiz,
  setShowModalDeleteQuiz,
  dataQuiz,
  fetchDataListQuizzes,
  fetchDataListQuizzesWithPaginate,
  currentPage,
  setCurrentPage,
}) => {
  const handleClose = () => {
    setShowModalDeleteQuiz(false);
  };

  useEffect(() => {
    setShowModalDeleteQuiz(isShowModalDeleteQuiz);
  }, []);

  const handleDeleteQuiz = async () => {
    let data = await deleteQuiz(dataQuiz.id);
    if (data && data.EC === 0) {
      toast.success(`${data.EM}`);
      handleClose();
      await fetchDataListQuizzes();
      // setCurrentPage(1);
      // await fetchDataListQuizzesWithPaginate(1);
    } else {
      toast.error(`${data.EM}`);
    }
  };

  return (
    <>
      <Modal
        show={isShowModalDeleteQuiz}
        onHide={handleClose}
        size="lg"
        backdrop="static"
        className="modal-delete-quiz"
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete quiz</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          do you want to delete quiz with id: {dataQuiz.id}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleDeleteQuiz}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalDeleteQuiz;
