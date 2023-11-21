import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getDataQuiz, postSubmitQuiz } from "../../services/apiService";
import _ from "lodash";
import Question from "./Question";
import ModalResult from "./ModalResult";
import RightContent from "./Content/RightContent";
import { useTranslation } from "react-i18next";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { toast } from "react-toastify";

import "./DetailsQuiz.scss";

const DetailsQuiz = () => {
  const location = useLocation(); // lấy state được truyền vào lúc navigate ở file ListQuiz.jsx

  const { t } = useTranslation();

  const params = useParams();
  const quizId = params.id; // lấy giá trị từ param id của url ở đây là: /quiz/:id

  const [dataQuiz, setDataQuiz] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showModalResult, setShowModalResult] = useState(false);
  const [dataModalResult, setDataModalResult] = useState({});
  const [isShowAnswer, setIsShowAnswer] = useState(false);
  const [isSubmitQuiz, setIsSubmitQuiz] = useState(false);

  useEffect(() => {
    const getQuestions = async () => {
      let data = await getDataQuiz(quizId);
      if (data && data.EC === 0) {
        let raw = _.chain(data.DT)
          // Group the elements of Array based on `color` property
          .groupBy("id")
          // `key` is group's name (color), `value` is the array of objects
          .map((value, key) => {
            let answers = [];
            let questionDescription,
              image = null;
            value.forEach((item, index) => {
              if (index === 0) {
                questionDescription = item.description;
                image = item.image;
              }
              item.answers.isSelected = false;
              item.answers.isCorrect = false;
              answers.push(item.answers);
            });
            answers = _.orderBy(answers, ["id"], ["asc"]);

            return { questionId: key, answers, questionDescription, image };
          })
          .value();
        setDataQuiz(raw);
      }
    };
    getQuestions();
  }, [quizId]);

  const handleCheckbox = (answerId, questionId) => {
    let dataQuizClone = _.cloneDeep(dataQuiz);
    let question = dataQuizClone.find((item) => item.questionId === questionId);
    let questionClone = question?.answers?.map((item) => {
      if (item.id === answerId) {
        item.isSelected = !item.isSelected;
      }
      return item;
    });
    question.answers = questionClone;
    let index = dataQuizClone.findIndex(
      (item) => item.questionId === questionId
    );
    if (index > -1) {
      dataQuizClone[index] = question;
      setDataQuiz(dataQuizClone);
    }
  };

  const handleFinish = async () => {
    let payload = {
      quizId: +quizId, // +quizId là chuyển về type Number
      answers: [],
    };

    dataQuiz?.forEach((question) => {
      let questionId = question.questionId;
      let userAnswerId = [];

      question.answers.forEach((answer) => {
        if (answer.isSelected) {
          userAnswerId.push(answer.id);
        }
      });

      payload.answers.push({
        questionId: +questionId,
        userAnswerId: userAnswerId,
      });
    });

    let data = await postSubmitQuiz(payload);

    if (data && data.EC === 0) {
      toast.success(`${data.EM}`);

      setIsSubmitQuiz(true);

      setDataModalResult({
        countCorrect: data.DT.countCorrect,
        countTotal: data.DT.countTotal,
        quizData: data.DT.quizData,
      });

      setShowModalResult(true);

      if (data?.DT?.quizData) {
        let dataQuizClone = _.cloneDeep(dataQuiz);

        // Duyệt qua mỗi câu hỏi trong dữ liệu quiz
        for (let q of data.DT.quizData) {
          // Tìm câu hỏi tương ứng trong dataQuizClone
          let matchingQuestion = dataQuizClone.find(
            (question) => +question.questionId === +q.questionId
          );

          // Nếu tìm thấy câu hỏi, cập nhật câu trả lời
          if (matchingQuestion) {
            matchingQuestion.answers = matchingQuestion.answers.map(
              (answer) => ({
                ...answer,
                // Đánh dấu câu trả lời là đúng nếu nó xuất hiện trong systemAnswers
                isCorrect: !!q.systemAnswers.find(
                  (sa) => +sa.id === +answer.id
                ),
              })
            );
          }
        }
        setDataQuiz(dataQuizClone);
      }
    } else {
      alert("Something wrong...");
    }
  };

  const handleShowAnswer = () => {
    if (!isSubmitQuiz) {
      return;
    }
    setIsShowAnswer(true);
  };

  return (
    <>
      <Breadcrumb className="breadcrumb">
        <Breadcrumb.Item href="/">{t("header.home")}</Breadcrumb.Item>
        <Breadcrumb.Item href="/user">{t("header.user")}</Breadcrumb.Item>
        <Breadcrumb.Item active>{t("homepage.doingQuiz")}</Breadcrumb.Item>
      </Breadcrumb>
      <div className="details-quiz-container">
        <div className="left-content">
          <div className="title">
            Quiz {quizId}: {location?.state?.quizTitle}
            <hr />
          </div>
          <div className="question-content">
            <Question
              data={dataQuiz[currentQuestion]}
              handleCheckbox={handleCheckbox}
              currentQuestion={currentQuestion}
              isShowAnswer={isShowAnswer}
              isSubmitQuiz={isSubmitQuiz}
            />
          </div>
          <div className="footer">
            <button
              className={`btn ${
                currentQuestion === 0
                  ? "btn-secondary cursor-no-drop"
                  : "btn-primary"
              }`}
              onClick={() => {
                if (currentQuestion > 0) {
                  setCurrentQuestion(currentQuestion - 1);
                }
              }}
            >
              {t("detailsQuiz.prev")}
            </button>
            <button
              className={`btn mx-3 ${
                currentQuestion === dataQuiz.length - 1
                  ? "btn-secondary cursor-no-drop"
                  : "btn-primary"
              }`}
              onClick={() => {
                if (currentQuestion < dataQuiz.length - 1) {
                  setCurrentQuestion(currentQuestion + 1);
                }
              }}
            >
              {t("detailsQuiz.next")}
            </button>
            <button
              className="btn btn-warning"
              onClick={() => handleFinish()}
              disabled={isSubmitQuiz}
            >
              {t("detailsQuiz.finish")}
            </button>
          </div>
        </div>
        <div className="right-content">
          <RightContent
            dataQuiz={dataQuiz}
            handleFinish={handleFinish}
            currentQuestion={currentQuestion}
            setCurrentQuestion={setCurrentQuestion}
          />
        </div>
        <ModalResult
          isShowModalResult={showModalResult}
          setShowModalResult={setShowModalResult}
          dataModalResult={dataModalResult}
          handleShowAnswer={handleShowAnswer}
        />
      </div>
    </>
  );
};

export default DetailsQuiz;
