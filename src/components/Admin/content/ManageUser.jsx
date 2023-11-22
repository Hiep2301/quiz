import React, { useEffect, useState } from "react";
import ModalCreateUser from "./ModalCreateUser";
import ModalUpdateUser from "./ModalUpdateUser";
// import TableUser from "./TableUser";
import ModalUserDetails from "./ModalUserDetails";
import ModalDeleteUser from "./ModalDeleteUser";
import TableUserPaginate from "./TableUserPaginate";
import {
  getAllUsers,
  getAllUsersWithPaginate,
} from "../../../services/apiService";

import "./ManageUser.scss";

const ManageUser = () => {
  const [showModalCreateUser, setShowModalCreateUser] = useState(false);
  const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
  const [showModalDeleteUser, setShowModalDeleteUser] = useState(false);
  const [showModalUserDetails, setShowModalUserDetails] = useState(false);
  const [dataUserUpdate, setDataUserUpdate] = useState({});
  const [dataUser, setDataUser] = useState({});
  const [listUsers, setListUsers] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const LIMIT_USER = 9;

  useEffect(() => {
    // fetchDataListUsers();
    fetchDataListUsersWithPaginate(1);
  }, []);

  const fetchDataListUsers = async () => {
    const data = await getAllUsers();
    if (data.EC === 0) {
      setListUsers(data.DT);
    }
  };

  const fetchDataListUsersWithPaginate = async (page) => {
    const data = await getAllUsersWithPaginate(page, LIMIT_USER);
    if (data.EC === 0) {
      setListUsers(data.DT.users);
      setPageCount(data.DT.totalPages);
    }
  };

  const handleClickBtnUpdate = (user) => {
    setShowModalUpdateUser(true);
    setDataUserUpdate(user);
  };

  const handleClickBtnDetails = (user) => {
    setShowModalUserDetails(true);
    setDataUser(user);
  };

  const handleClickBtnDelete = (user) => {
    setShowModalDeleteUser(true);
    setDataUser(user);
  };

  const resetDataUpdate = () => {
    setDataUserUpdate({});
  };

  return (
    <div className="manage-user-container">
      <div className="title">Manage User</div>
      <div className="user-content">
        <div className="btn-add-user">
          <button
            className="btn btn-primary"
            onClick={() => setShowModalCreateUser(true)}
          >
            Add new user
          </button>
        </div>
        <div className="table-user-container">
          {/* <TableUser
            listUsers={listUsers}
            handleClickBtnUpdate={handleClickBtnUpdate}
            handleClickBtnDetails={handleClickBtnDetails}
            handleClickBtnDelete={handleClickBtnDelete}
          /> */}
          <TableUserPaginate
            listUsers={listUsers}
            handleClickBtnUpdate={handleClickBtnUpdate}
            handleClickBtnDetails={handleClickBtnDetails}
            handleClickBtnDelete={handleClickBtnDelete}
            fetchDataListUsersWithPaginate={fetchDataListUsersWithPaginate}
            pageCount={pageCount}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
        <ModalCreateUser
          isShowModalCreateUser={showModalCreateUser}
          setShowModalCreateUser={setShowModalCreateUser}
          fetchDataListUsers={fetchDataListUsers}
          fetchDataListUsersWithPaginate={fetchDataListUsersWithPaginate}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
        <ModalUpdateUser
          isShowModalUpdateUser={showModalUpdateUser}
          setShowModalUpdateUser={setShowModalUpdateUser}
          dataUserUpdate={dataUserUpdate}
          fetchDataListUsers={fetchDataListUsers}
          fetchDataListUsersWithPaginate={fetchDataListUsersWithPaginate}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          resetDataUpdate={resetDataUpdate}
        />
        <ModalUserDetails
          isShowModalUserDetails={showModalUserDetails}
          setShowModalUserDetails={setShowModalUserDetails}
          dataUser={dataUser}
        />
        <ModalDeleteUser
          isShowModalDeleteUser={showModalDeleteUser}
          setShowModalDeleteUser={setShowModalDeleteUser}
          dataUser={dataUser}
          fetchDataListUsers={fetchDataListUsers}
          fetchDataListUsersWithPaginate={fetchDataListUsersWithPaginate}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default ManageUser;
