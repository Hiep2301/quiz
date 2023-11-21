import React, { useState } from "react";
import ReactPaginate from "react-paginate";

const TableUserPaginate = ({
  listUsers,
  handleClickBtnUpdate,
  handleClickBtnDetails,
  handleClickBtnDelete,
  fetchDataListUsersWithPaginate,
  pageCount,
  currentPage,
  setCurrentPage,
}) => {
  const handlePageClick = (event) => {
    fetchDataListUsersWithPaginate(event.selected + 1);
    setCurrentPage(event.selected + 1);
  };

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
      <div className="user-paginate float-end">
        <ReactPaginate
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel="< previous"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          renderOnZeroPageCount={null}
          forcePage={currentPage - 1}
        />
      </div>
    </>
  );
};

export default TableUserPaginate;
