import React, { useEffect, useState } from "react";
import Select from "react-select";
import {
  getAllQuizzes,
  getAllUsers,
  postAssignQuizToUser,
} from "../../../../services/apiService";
import { toast } from "react-toastify";

const AssignQuiz = ({ fetchDataListQuizzes }) => {
  const [selectedQuiz, setSelectedQuiz] = useState({});
  const [listQuizzes, setListQuizzes] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});
  const [listUsers, setListUsers] = useState([]);

  useEffect(() => {
    const getListQuizzes = async () => {
      await fetchDataListQuizzes();

      let data = await getAllQuizzes();
      if (data && data.EC === 0) {
        let newQuiz = data.DT.map((item) => {
          return {
            value: item.id,
            label: `${item.name} - ${item.description}`,
          };
        });

        setListQuizzes(newQuiz);
      }
    };

    const getListUsers = async () => {
      let data = await getAllUsers();
      if (data && data.EC === 0) {
        let newUser = data.DT.map((item) => {
          return {
            value: item.id,
            label: `${item.username} - ${item.email}`,
          };
        });

        setListUsers(newUser);
      }
    };

    getListQuizzes();
    getListUsers();
  }, []);

  const handleAssign = async () => {
    let data = await postAssignQuizToUser(
      selectedQuiz.value,
      selectedUser.value
    );
    if (data && data.EC === 0) {
      toast.success(`${data.EM}`);
    } else {
      toast.error(`${data.EM}`);
    }
  };

  return (
    <div className="assign-quiz-container row">
      <div className="col-6 form-group">
        <label className="mb-2">Select Quiz</label>
        <Select
          defaultValue={selectedQuiz}
          onChange={setSelectedQuiz}
          options={listQuizzes}
          placeholder={"Quiz"}
        />
      </div>
      <div className="col-6 form-group">
        <label className="mb-2">Select User</label>
        <Select
          defaultValue={selectedUser}
          onChange={setSelectedUser}
          options={listUsers}
          placeholder={"User"}
        />
      </div>
      <div className="mt-3">
        <button className="btn btn-primary" onClick={() => handleAssign()}>
          Assign
        </button>
      </div>
    </div>
  );
};

export default AssignQuiz;
