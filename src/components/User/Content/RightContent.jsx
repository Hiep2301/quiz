import React, { useEffect, useState } from "react";
import CountDown from "./CountDown";
import "./RightContent.scss";

const RightContent = ({
  dataQuiz,
  handleFinish,
  currentQuestion,
  setCurrentQuestion,
}) => {
  const [activeQuestionIndex, setActiveQuestionIndex] =
    useState(currentQuestion);

  // Sử dụng useEffect để cập nhật activeQuestionIndex mỗi khi currentQuestion thay đổi
  useEffect(() => {
    setActiveQuestionIndex(currentQuestion);
  }, [currentQuestion]);

  const onTimeOut = () => {
    handleFinish();
  };

  const getClassQuestion = (question, index) => {
    let className = "question";
    if (index === activeQuestionIndex) {
      className += " active";
    } else if (question.answers.some((answer) => answer.isSelected)) {
      className += " done";
    }
    return className;
  };

  const handleClickQuestion = (index) => {
    setActiveQuestionIndex(index);
    setCurrentQuestion(index);
  };

  return (
    <>
      <div className="main-time">
        <CountDown onTimeOut={onTimeOut} />
      </div>
      <hr />
      <div className="main-question">
        {dataQuiz.map((item, index) => (
          <div
            key={item.questionId}
            className={getClassQuestion(item, index)}
            onClick={() => handleClickQuestion(index)}
          >
            {index + 1}
          </div>
        ))}
      </div>
    </>
  );
};

export default RightContent;
