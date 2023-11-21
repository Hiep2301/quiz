import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

const ModalResult = ({
  isShowModalResult,
  setShowModalResult,
  dataModalResult,
  handleShowAnswer,
}) => {
  const { t } = useTranslation();

  const handleClose = () => {
    setShowModalResult(false);
  };

  useEffect(() => {
    setShowModalResult(isShowModalResult);
  }, []);

  return (
    <>
      <Modal
        show={isShowModalResult}
        onHide={handleClose}
        size="lg"
        backdrop="static"
        className="modal-delete-user"
      >
        <Modal.Header closeButton>
          <Modal.Title>{t("modalResult.title")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            {t("modalResult.totalQuestion")} <b>{dataModalResult.countTotal}</b>
          </div>
          <div>
            {t("modalResult.totalCorrectAnswer")}
            <b>{dataModalResult.countCorrect}</b>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              handleClose();
              handleShowAnswer();
            }}
          >
            {t("modalResult.showAnswer")}
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            {t("modalResult.close")}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalResult;
