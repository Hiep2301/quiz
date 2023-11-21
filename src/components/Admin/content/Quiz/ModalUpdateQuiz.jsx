import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import _ from "lodash";
import { putUpdateQuiz } from "../../../../services/apiService";

const ModalUpdateQuiz = ({
  isShowModalUpdateQuiz,
  setShowModalUpdateQuiz,
  dataQuizUpdate,
  fetchDataListQuizzes,
  fetchDataListQuizzesWithPaginate,
  currentPage,
  setCurrentPage,
}) => {
  const [imagePreview, setImagePreview] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [quizImage, setQuizImage] = useState("");

  const handleClose = () => {
    setShowModalUpdateQuiz(false);
    setImagePreview("");
    setQuizImage("");
    setDescription("");
    setName("");
    setDifficulty("");
  };

  useEffect(() => {
    setShowModalUpdateQuiz(isShowModalUpdateQuiz);
  }, []);

  useEffect(() => {
    if (!_.isEmpty(dataQuizUpdate)) {
      const { description, name, difficulty, image } = dataQuizUpdate;
      setDescription(description);
      setName(name);
      setDifficulty(difficulty);
      if (image) {
        setQuizImage(`data:image/*;base64,${image}`);
        setImagePreview(`data:image/*;base64,${image}`);
      }
    }
  }, [dataQuizUpdate]);

  const handleSubmitQuiz = async () => {
    if (!name) {
      toast.warn("Name is required!");
      return;
    }

    if (!description) {
      toast.warn("Description is required!");
      return;
    }

    if (!quizImage) {
      toast.warn("Image is required!");
      return;
    }

    let data = await putUpdateQuiz(
      dataQuizUpdate.id,
      description,
      name,
      difficulty,
      quizImage
    );

    if (data && data.EC === 0) {
      toast.success(`${data.EM}`);
      handleClose();
      await fetchDataListQuizzes();
      // setCurrentPage(1);
      // await fetchDataListQuizzesWithPaginate(currentPage);
    } else {
      toast.error(`${data.EM}`);
    }
  };

  return (
    <>
      <Modal
        show={isShowModalUpdateQuiz}
        onHide={handleClose}
        size="lg"
        backdrop="static"
        className="modal-update-quiz"
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit quiz</Modal.Title>
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
                required
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Description</label>
              <input
                type="text"
                className="form-control"
                placeholder="Description"
                value={description}
                required
                onChange={(event) => setDescription(event.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Difficulty</label>
              <select
                className="form-select"
                value={difficulty}
                onChange={(event) => {
                  setDifficulty(event.target.value);
                }}
              >
                <option value="EASY">EASY</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="HARD">HARD</option>
              </select>
            </div>
            <div className="col-md-12">
              <label className="form-label">Image</label>
              <input
                type="file"
                className="form-control"
                aria-label="file image"
                required
                onChange={(event) => {
                  setImagePreview(URL.createObjectURL(event.target.files[0]));
                  setQuizImage(event.target.files[0]);
                }}
                accept="image/*"
              />
              {imagePreview && (
                <div
                  className="image-preview"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src={imagePreview}
                    alt="Preview"
                    style={{
                      margin: "10px",
                      maxWidth: "30%",
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
          <Button variant="primary" onClick={handleSubmitQuiz}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalUpdateQuiz;
