import React from "react";

const TableQuiz = ({
  listQuizzes,
  handleClickBtnDetails,
  handleClickBtnUpdate,
  handleClickBtnDelete,
}) => {
  return (
    <>
      <table className="table table-bordered table-hover mb-4">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Type</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {listQuizzes && listQuizzes.length > 0 ? (
            listQuizzes.map((quiz) => (
              <tr key={quiz.id}>
                <th scope="row">{quiz.id}</th>
                <td>{quiz.name}</td>
                <td>{quiz.description}</td>
                <td>{quiz.difficulty}</td>
                <td>
                  <button
                    className="btn btn-secondary"
                    onClick={() => {
                      handleClickBtnDetails(quiz);
                    }}
                  >
                    Details
                  </button>
                  <button
                    className="btn btn-success mx-2"
                    onClick={() => {
                      handleClickBtnUpdate(quiz);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      handleClickBtnDelete(quiz);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr className="text-center">
              <td colSpan={"5"}>Not found data</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default TableQuiz;
