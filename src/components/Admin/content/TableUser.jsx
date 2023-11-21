import React from "react";

const TableUser = ({
  listUsers,
  handleClickBtnUpdate,
  handleClickBtnDetails,
  handleClickBtnDelete,
}) => {
  return (
    <>
      <table className="table table-bordered table-hover">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Usernam</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {listUsers && listUsers.length > 0 ? (
            listUsers.map((user) => (
              <tr key={user.id}>
                <th scope="row">{user.id}</th>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button
                    className="btn btn-secondary"
                    onClick={() => {
                      handleClickBtnDetails(user);
                    }}
                  >
                    Details
                  </button>
                  <button
                    className="btn btn-primary mx-2"
                    onClick={() => {
                      handleClickBtnUpdate(user);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      handleClickBtnDelete(user);
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

export default TableUser;
