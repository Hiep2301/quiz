import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import _ from "lodash";

const ModalQuizDetails = ({
  isShowModalQuizDetails,
  setShowModalQuizDetails,
  dataQuiz,
}) => {
  const [imagePreview, setImagePreview] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [difficulty, setDifficulty] = useState("");

  const handleClose = () => {
    setShowModalQuizDetails(false);
  };

  useEffect(() => {
    setShowModalQuizDetails(isShowModalQuizDetails);
  }, []);

  useEffect(() => {
    if (!_.isEmpty(dataQuiz)) {
      const { description, name, difficulty, image } = dataQuiz;
      setDescription(description);
      setName(name);
      setDifficulty(difficulty);
      if (image) {
        setImagePreview(`data:image/*;base64,${image}`);
      }
    }
  }, [dataQuiz]);

  return (
    <>
      <Modal
        show={isShowModalQuizDetails}
        onHide={handleClose}
        size="lg"
        backdrop="static"
        className="modal-quiz-details"
      >
        <Modal.Header closeButton>
          <Modal.Title>Quiz details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                value={name}
                disabled
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Description</label>
              <input
                type="text"
                className="form-control"
                placeholder="Description"
                value={description}
                disabled
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Difficulty</label>
              <input
                type="text"
                className="form-control"
                placeholder="Difficulty"
                value={difficulty}
                disabled
              />
            </div>
            <div className="col-md-12">
              <label className="form-label">Image</label>
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

export default ModalQuizDetails;
