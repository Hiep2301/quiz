import React, { useEffect, useState } from "react";
import Select from "react-select";
import { toast } from "react-toastify";
import {
  getAllQuizzes,
  postCreateNewQuiz,
} from "../../../../services/apiService";
import TableQuiz from "./TableQuiz";
import ModalDeleteQuiz from "./ModalDeleteQuiz";
import ModalUpdateQuiz from "./ModalUpdateQuiz";
import ModalQuizDetails from "./ModalQuizDetails";
import QuizQA from "./QuizQA";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import AssignQuiz from "./AssignQuiz";
import { BiImageAdd } from "react-icons/bi";
import Lightbox from "react-awesome-lightbox";

import "./ManageQuiz.scss";

const ManageQuiz = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState("EASY");
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [isPreviewImage, setIsPreviewImage] = useState(false);
  const [listQuizzes, setListQuizzes] = useState([]);
  const [showModalQuizDetails, setShowModalQuizDetails] = useState(false);
  const [showModalUpdateQuiz, setShowModalUpdateQuiz] = useState(false);
  const [showModalDeleteQuiz, setShowModalDeleteQuiz] = useState(false);
  const [dataQuiz, setDataQuiz] = useState({});
  const [dataQuizUpdate, setDataQuizUpdate] = useState({});

  const options = [
    { value: "EASY", label: "EASY" },
    { value: "MEDIUM", label: "MEDIUM" },
    { value: "HARD", label: "HARD" },
  ];

  const handleSubmitQuiz = async () => {
    if (!name) {
      toast.warn("Name is required!");
      return;
    }

    if (!description) {
      toast.warn("Description is required!");
      return;
    }

    if (!image) {
      toast.warn("Image is required!");
      return;
    }

    let data = await postCreateNewQuiz(
      name,
      description,
      difficulty?.value,
      image
    );
    if (data && data.EC === 0) {
      toast.success(`${data.EM}`);
      setName("");
      setDescription("");
      setImage("");
      setImagePreview("");
      fetchDataListQuizzes();
    } else {
      toast.error(`${data.EM}`);
    }
  };

  useEffect(() => {
    fetchDataListQuizzes();
  }, []);

  const fetchDataListQuizzes = async () => {
    const data = await getAllQuizzes();
    if (data && data.EC === 0) {
      setListQuizzes(data.DT);
    }
  };

  const handleClickBtnDetails = (quiz) => {
    setShowModalQuizDetails(true);
    setDataQuiz(quiz);
  };

  const handleClickBtnUpdate = (quiz) => {
    setShowModalUpdateQuiz(true);
    setDataQuizUpdate(quiz);
  };

  const handleClickBtnDelete = (quiz) => {
    setShowModalDeleteQuiz(true);
    setDataQuiz(quiz);
  };

  const resetDataUpdate = () => {
    setDataQuizUpdate({});
  };

  return (
    <div className="quiz-container mb-3">
      <Tabs
        defaultActiveKey="manageQuiz"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="manageQuiz" title="Manage Quiz">
          <div className="add-new">
            <fieldset className="border rounded-3 p-3">
              <legend className="float-none w-auto px-3">Add new quiz</legend>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name"
                  required
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
                <label>Name</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Description"
                  required
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                />
                <label>Description</label>
              </div>
              <div className="form-floating mb-3">
                <Select
                  defaultValue={difficulty}
                  onChange={setDifficulty}
                  options={options}
                  placeholder={"Difficulty"}
                />
              </div>
              <div className="mb-3">
                <label
                  className="form-label label-upload"
                  htmlFor="imageUpload"
                >
                  <BiImageAdd className="icon-image-add" />
                  <span>Upload image</span>
                </label>
                <input
                  className="form-control"
                  type="file"
                  id="imageUpload"
                  hidden
                  accept="image/*"
                  onChange={(event) => {
                    setImagePreview(URL.createObjectURL(event.target.files[0]));
                    setImage(event.target.files[0]);
                  }}
                />
              </div>
              {imagePreview && (
                <div className="image-preview mb-3">
                  <img
                    onClick={() => setIsPreviewImage(true)}
                    src={imagePreview}
                    alt="Image Preview"
                    style={{
                      margin: "10px",
                      maxWidth: "20%",
                      height: "auto",
                    }}
                  />
                </div>
              )}
              {isPreviewImage && (
                <Lightbox
                  image={imagePreview}
                  title={"Image Preview"}
                  onClose={() => setIsPreviewImage(false)}
                />
              )}
              <div className="float-end">
                <button
                  className="btn btn-primary"
                  onClick={() => handleSubmitQuiz()}
                >
                  Save
                </button>
              </div>
            </fieldset>
          </div>
          <div className="list-details mt-3">
            <TableQuiz
              listQuizzes={listQuizzes}
              handleClickBtnDetails={handleClickBtnDetails}
              handleClickBtnUpdate={handleClickBtnUpdate}
              handleClickBtnDelete={handleClickBtnDelete}
            />
          </div>
        </Tab>
        <Tab eventKey="UpdateQ/AQuiz" title="Update Q/A Quiz">
          <QuizQA />
        </Tab>
        <Tab eventKey="AssignToUsers" title="Assign to Users">
          <AssignQuiz fetchDataListQuizzes={fetchDataListQuizzes} />
        </Tab>
      </Tabs>

      <ModalDeleteQuiz
        isShowModalDeleteQuiz={showModalDeleteQuiz}
        setShowModalDeleteQuiz={setShowModalDeleteQuiz}
        dataQuiz={dataQuiz}
        fetchDataListQuizzes={fetchDataListQuizzes}
      />
      <ModalUpdateQuiz
        isShowModalUpdateQuiz={showModalUpdateQuiz}
        setShowModalUpdateQuiz={setShowModalUpdateQuiz}
        dataQuizUpdate={dataQuizUpdate}
        fetchDataListQuizzes={fetchDataListQuizzes}
        resetDataUpdate={resetDataUpdate}
      />
      <ModalQuizDetails
        isShowModalQuizDetails={showModalQuizDetails}
        setShowModalQuizDetails={setShowModalQuizDetails}
        dataQuiz={dataQuiz}
      />
    </div>
  );
};

export default ManageQuiz;
