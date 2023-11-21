import React, { useEffect, useState } from "react";
import { getQuizByUser } from "../../services/apiService";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import "./ListQuiz.scss";

const ListQuiz = () => {
  const navigate = useNavigate();

  const { t } = useTranslation();

  const [listQuiz, setListQuiz] = useState([]);

  useEffect(() => {
    const getListQuiz = async () => {
      let data = await getQuizByUser();
      if (data && data.EC === 0) {
        setListQuiz(data.DT);
      }
    };
    getListQuiz();
  }, []);

  return (
    <div className="list-quiz-container mt-5">
      {listQuiz &&
        listQuiz.length > 0 &&
        listQuiz.map((item, index) => {
          return (
            <div key={item.id} className="col-3 d-flex justify-content-center">
              <div className="card" style={{ width: "18rem" }}>
                <img
                  src={`data:image/*;base64,${item.image}`}
                  className="card-img-top"
                  alt="..."
                />
                <div className="card-body">
                  <h5 className="card-title">Quiz {index + 1}</h5>
                  <p className="card-text mb-3">{item.description}</p>
                  <span
                    className="btn btn-primary"
                    onClick={() =>
                      navigate(`/quiz/${item.id}`, {
                        state: { quizTitle: item.description },
                      })
                    }
                  >
                    {t("listQuiz.start")}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      {listQuiz && listQuiz.length === 0 && <div>{t("listQuiz.noQuiz")}</div>}
    </div>
  );
};

export default ListQuiz;
