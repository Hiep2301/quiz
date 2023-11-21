import React from "react";
import _ from "lodash";
import { IoIosClose, IoIosCheckmark } from "react-icons/io";

import "./Question.scss";

const Question = ({
  data,
  currentQuestion,
  handleCheckbox,
  isShowAnswer,
  isSubmitQuiz,
}) => {
  const subHandleCheckbox = (event, answerId, questionId) => {
    handleCheckbox(answerId, questionId);
  };

  if (_.isEmpty(data)) {
    return <></>;
  }

  return (
    <>
      {data.image ? (
        <div className="question-image w-100 mb-3 d-flex justify-content-center">
          <img
            className="w-50"
            src={`data:image/*;base64,${data.image}`}
            alt=""
          />
        </div>
      ) : (
        <div className="question-image w-100 mb-3 d-flex justify-content-center"></div>
      )}
      <div className="question mb-3 text-center">
        Question {currentQuestion + 1}: {data.questionDescription}?
      </div>
      <div className="answers-container">
        {data?.answers &&
          data?.answers.length &&
          data.answers.map((item) => {
            return (
              <div className="answer-item" key={item.id}>
                <div className="form-check d-flex align-items-center">
                  <input
                    className="form-check-input mt-0 me-2"
                    type="checkbox"
                    checked={item.isSelected}
                    disabled={isSubmitQuiz}
                    onChange={(event) =>
                      subHandleCheckbox(event, item.id, data.questionId)
                    }
                    id="flexCheckDefault"
                  />
                  <label className="form-check-label">{item.description}</label>
                  {isShowAnswer && (
                    <>
                      {item.isSelected === true && item.isCorrect === false && (
                        <IoIosClose className="incorrect" />
                      )}

                      {item.isCorrect === true && (
                        <IoIosCheckmark className="correct" />
                      )}
                    </>
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Question;
