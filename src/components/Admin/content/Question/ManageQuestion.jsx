import React, { useEffect, useState } from "react";
import Select from "react-select";
import { FcPlus, FcEmptyTrash } from "react-icons/fc";
import { BsPatchPlusFill, BsFillPatchMinusFill } from "react-icons/bs";
import { BiImageAdd } from "react-icons/bi";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import _ from "lodash";
import Lightbox from "react-awesome-lightbox";
import {
  getAllQuizzes,
  postCreateNewAnswer,
  postCreateNewQuestion,
} from "../../../../services/apiService";

import "./ManageQuestion.scss";

const ManageQuestion = () => {
  const [selectedQuiz, setSelectedQuiz] = useState({});
  const [listQuizzes, setListQuizzes] = useState([]);
  const [isPreviewImage, setIsPreviewImage] = useState(false);
  const [dataImagePreview, setDataImagePreview] = useState({
    title: "",
    url: "",
  });
  const [invalidItems, setInvalidItems] = useState({
    questions: {},
    answers: {},
  });
  const [questions, setQuestions] = useState([
    {
      id: uuidv4(),
      description: "",
      imageFile: "",
      imageName: "",
      answers: [
        {
          id: uuidv4(),
          description: "",
          isCorrect: false,
        },
      ],
    },
  ]);

  useEffect(() => {
    const getListQuizzes = async () => {
      let data = await getAllQuizzes();
      if (data && data.EC === 0) {
        let newQuiz = data.DT.map((item) => {
          return {
            value: item.id,
            label: item.description,
          };
        });

        setListQuizzes(newQuiz);
      }
    };
    getListQuizzes();
  }, []);

  const handleAddRemoveQuestion = (type, id) => {
    if (type === "add") {
      setQuestions([
        ...questions,
        {
          id: uuidv4(),
          description: "",
          imageFile: "",
          imageName: "",
          answers: [
            {
              id: uuidv4(),
              description: "",
              isCorrect: false,
            },
          ],
        },
      ]);
    } else {
      if (questions.length === 1) {
        toast.warn("You can't remove the last question");
        return;
      }
      let questionsClone = _.cloneDeep(questions);
      setQuestions(questionsClone.filter((question) => question.id !== id));
    }
  };

  const handleAddRemoveAnswer = (type, questionId, answerId) => {
    let questionsClone = _.cloneDeep(questions); // Sao chép sâu mảng questions

    // Tìm vị trí của câu hỏi trong mảng
    const indexQuestion = questionsClone.findIndex(
      (question) => question.id === questionId
    );

    if (indexQuestion !== -1) {
      if (type === "add") {
        // Thêm câu trả lời mới vào câu hỏi tương ứng
        questionsClone[indexQuestion].answers.push({
          id: uuidv4(),
          description: "",
          isCorrect: false,
        });
      } else if (questionsClone[indexQuestion].answers.length > 1) {
        // Xóa câu trả lời khỏi câu hỏi tương ứng
        questionsClone[indexQuestion].answers = questionsClone[
          indexQuestion
        ].answers.filter((answer) => answer.id !== answerId);
      } else {
        toast.warn("You can't remove the last answer");
        return; // Không làm gì nếu đây là câu trả lời cuối cùng
      }

      setQuestions(questionsClone); // Cập nhật trạng thái với mảng mới
    }
  };

  const handleQuestionDescriptionChange = (id, value) => {
    let questionsClone = _.cloneDeep(questions); // Sao chép sâu mảng questions
    // Tìm vị trí của câu hỏi trong mảng
    const indexQuestion = questionsClone.findIndex(
      (question) => question.id === id
    );
    if (indexQuestion !== -1) {
      questionsClone[indexQuestion].description = value; // Cập nhật mô tả cho câu hỏi

      // Remove in-valid class if value is entered
      if (value.trim() !== "") {
        setInvalidItems((prevState) => ({
          ...prevState,
          questions: { ...prevState.questions, [id]: false },
        }));
      }

      setQuestions(questionsClone); // Cập nhật trạng thái với mảng mới
    }
  };

  const handleAnswerDescriptionChange = (questionId, answerId, value) => {
    let questionsClone = _.cloneDeep(questions); // Sao chép sâu mảng questions
    // Tìm vị trí của câu hỏi trong mảng
    const indexQuestion = questionsClone.findIndex(
      (question) => question.id === questionId
    );
    if (indexQuestion !== -1) {
      // Tìm vị trí của câu trả lời trong mảng
      const indexAnswer = questionsClone[indexQuestion].answers.findIndex(
        (answer) => answer.id === answerId
      );
      if (indexAnswer !== -1) {
        questionsClone[indexQuestion].answers[indexAnswer].description = value; // Cập nhật mô tả cho câu trả lời

        // Remove invalid class if value is entered
        if (value.trim() !== "") {
          setInvalidItems((prevState) => ({
            ...prevState,
            answers: { ...prevState.answers, [answerId]: false },
          }));
        }

        setQuestions(questionsClone); // Cập nhật trạng thái với mảng mới
      }
    }
  };

  const handleUploadFile = (event, questionId) => {
    let questionsClone = _.cloneDeep(questions);
    const indexQuestion = questionsClone.findIndex(
      (question) => question.id === questionId
    );
    if (
      indexQuestion !== -1 &&
      event.target &&
      event.target.files &&
      event.target.files[0]
    ) {
      questionsClone[indexQuestion].imageFile = event.target.files[0];
      questionsClone[indexQuestion].imageName = event.target.files[0].name;
      setQuestions(questionsClone);
    }
  };

  const handleChangeCheckBoxAnswer = (questionId, answerId, value) => {
    let questionsClone = _.cloneDeep(questions); // Sao chép sâu mảng questions
    // Tìm vị trí của câu hỏi trong mảng
    const indexQuestion = questionsClone.findIndex(
      (question) => question.id === questionId
    );
    if (indexQuestion !== -1) {
      // Tìm vị trí của câu trả lời trong mảng
      const indexAnswer = questionsClone[indexQuestion].answers.findIndex(
        (answer) => answer.id === answerId
      );
      if (indexAnswer !== -1) {
        questionsClone[indexQuestion].answers[indexAnswer].isCorrect = value; // Cập nhật mô tả cho câu trả lời
        setQuestions(questionsClone); // Cập nhật trạng thái với mảng mới
      }
    }
  };

  const validateItems = () => {
    let isValid = true;
    const invalidQuestions = {};
    const invalidAnswers = {};

    questions.forEach((question) => {
      if (question.description === "") {
        isValid = false;
        invalidQuestions[question.id] = true;
      }

      question.answers.forEach((answer) => {
        if (answer.description === "") {
          isValid = false;
          invalidAnswers[answer.id] = true;
        }
      });
    });

    setInvalidItems({ questions: invalidQuestions, answers: invalidAnswers });
    return isValid;
  };

  const handleSubmit = async () => {
    if (_.isEmpty(selectedQuiz)) {
      toast.warn("Quiz is required!");
      return;
    }

    // //validate question
    // for (const question of questions) {
    //   if (question.description === "") {
    //     toast.warn("Question is required!");
    //     return;
    //   }
    // }

    // //validate answer
    // for (const question of questions) {
    //   if (question.answers.length < 2) {
    //     toast.warn("At least 2 answers are required!");
    //     return;
    //   }
    //   for (const element of question.answers) {
    //     if (element.description === "") {
    //       toast.warn("Answer is required!");
    //       return;
    //     }
    //   }
    // }

    for (const question of questions) {
      if (question.answers.length < 2) {
        toast.warn("At least 2 answers are required!");
        return;
      }
    }

    if (!validateItems()) {
      toast.warn("Please fill all required fields!");
      return;
    }

    // await Promise.all(
    //   questions.map(async (question) => {
    //     const dataQuestion = await postCreateNewQuestion(
    //       selectedQuiz.value,
    //       question.description,
    //       question.imageFile
    //     );

    //     await Promise.all(
    //       question.answers.map(async (answer) => {
    //         await postCreateNewAnswer(
    //           dataQuestion.DT.id,
    //           answer.description,
    //           answer.isCorrect
    //         );
    //       })
    //     );
    //   })
    // );

    for (const question of questions) {
      const dataQuestion = await postCreateNewQuestion(
        selectedQuiz.value,
        question.description,
        question.imageFile
      );

      for (const answer of question.answers) {
        await postCreateNewAnswer(
          dataQuestion.DT.id,
          answer.description,
          answer.isCorrect
        );
      }
    }

    toast.success("Create question successfully!");
    setSelectedQuiz({});
    setQuestions([
      {
        id: uuidv4(),
        description: "",
        imageFile: "",
        imageName: "",
        answers: [
          {
            id: uuidv4(),
            description: "",
            isCorrect: false,
          },
        ],
      },
    ]);
  };

  return (
    <div className="manage-question-container">
      <div className="title">Manage Question</div>
      <div className="add-new-question mt-3">
        <div className="col-6 form-group">
          <label className="mb-2">Select Quiz</label>
          <Select
            defaultValue={selectedQuiz}
            onChange={setSelectedQuiz}
            options={listQuizzes}
            placeholder={"Quiz"}
          />
        </div>
        <div className="my-3">Add questions</div>
        {questions &&
          questions.length > 0 &&
          questions.map((question, index) => {
            return (
              <div key={question.id} className="question-main mb-4">
                <div className="question-content d-flex align-items-center">
                  <div className="form-floating description">
                    <input
                      type="text"
                      className={`form-control ${
                        invalidItems.questions[question.id] ? "is-invalid" : ""
                      }`}
                      placeholder="Description"
                      value={question.description}
                      onChange={(event) =>
                        handleQuestionDescriptionChange(
                          question.id,
                          event.target.value
                        )
                      }
                    />
                    <label style={{ zIndex: "0" }}>
                      Description {index + 1}
                    </label>
                  </div>
                  <div className="group-upload">
                    <label className="icon-upload" htmlFor={`${question.id}`}>
                      <BiImageAdd />
                    </label>
                    <input
                      type="file"
                      hidden
                      id={`${question.id}`}
                      accept="image/*"
                      onChange={(event) => handleUploadFile(event, question.id)}
                    />
                    <span className="file-name">
                      {question.imageName ? (
                        <span
                          onClick={() => {
                            setDataImagePreview({
                              title: question.imageName,
                              url: URL.createObjectURL(question.imageFile),
                            });
                            setIsPreviewImage(true);
                          }}
                          style={{ cursor: "pointer" }}
                        >
                          {question.imageName}
                        </span>
                      ) : (
                        "0 file is uploaded"
                      )}
                    </span>
                  </div>
                  <div className="btn-add-remove">
                    <span
                      onClick={() =>
                        handleAddRemoveQuestion("add", question.id)
                      }
                    >
                      <FcPlus className="icon-add" />
                    </span>
                    <span
                      onClick={() =>
                        handleAddRemoveQuestion("remove", question.id)
                      }
                    >
                      <FcEmptyTrash className="icon-remove" />
                    </span>
                  </div>
                </div>
                {question?.answers &&
                  question?.answers.length > 0 &&
                  question?.answers?.map((answer, index) => {
                    return (
                      <div key={answer.id} className="answer-content">
                        <input
                          type="checkbox"
                          className="form-check-input is-correct"
                          checked={answer.isCorrect}
                          onChange={(event) =>
                            handleChangeCheckBoxAnswer(
                              question.id,
                              answer.id,
                              event.target.checked
                            )
                          }
                        />
                        <div className="form-floating answer-name w-50">
                          <input
                            type="text"
                            className={`form-control ${
                              invalidItems.answers[answer.id]
                                ? "is-invalid"
                                : ""
                            }`}
                            placeholder="Answer"
                            value={answer.description}
                            onChange={(event) =>
                              handleAnswerDescriptionChange(
                                question.id,
                                answer.id,
                                event.target.value
                              )
                            }
                          />
                          <label style={{ zIndex: "0" }}>
                            Answer {index + 1}
                          </label>
                        </div>
                        <div className="btn-add-remove">
                          <span
                            onClick={() =>
                              handleAddRemoveAnswer(
                                "add",
                                question.id,
                                answer.id
                              )
                            }
                          >
                            <BsPatchPlusFill className="icon-add" />
                          </span>
                          <span
                            onClick={() =>
                              handleAddRemoveAnswer(
                                "remove",
                                question.id,
                                answer.id
                              )
                            }
                          >
                            <BsFillPatchMinusFill className="icon-remove" />
                          </span>
                        </div>
                      </div>
                    );
                  })}
              </div>
            );
          })}
        {questions && questions.length > 0 && (
          <div className="mb-4">
            <button className="btn btn-primary" onClick={handleSubmit}>
              Save question
            </button>
          </div>
        )}
      </div>
      {isPreviewImage && (
        <Lightbox
          image={dataImagePreview.url}
          title={dataImagePreview.title}
          onClose={() => setIsPreviewImage(false)}
        />
      )}
    </div>
  );
};

export default ManageQuestion;
