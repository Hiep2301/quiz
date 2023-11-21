import React, { useEffect, useState } from "react";
import { getHistory } from "../../services/apiService";
import moment from "moment";

const History = () => {
  const [listHistory, setListHistory] = useState([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    let data = await getHistory();
    if (data && data.EC === 0) {
      let newData = data?.DT?.data.map((item) => {
        return {
          total_correct: item.total_correct,
          total_questions: item.total_questions,
          name: item?.quizHistory?.name ?? "",
          id: item.id,
          date: moment(item.createdAt).utc().format("DD/MM/YYYY hh:mm:ss A"),
        };
      });
      if (newData.length > 7) {
        newData = newData.slice(newData.length - 7, newData.length);
      }
      setListHistory(newData);
    }
  };

  return (
    <div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Quiz Name</th>
            <th scope="col">Total Questions</th>
            <th scope="col">Total Correct</th>
            <th scope="col">Date</th>
          </tr>
        </thead>
        <tbody>
          {listHistory.map((item, index) => {
            return (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.total_questions}</td>
                <td>{item.total_correct}</td>
                <td>{item.date}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default History;
