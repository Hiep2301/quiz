export const FETCH_USER_LOGIN_SUCCESS = "FETCH_USER_LOGIN_SUCCESS";
export const FETCH_USER_LOGOUT_SUCCESS = "FETCH_USER_LOGOUT_SUCCESS";
export const FETCH_USER_UPDATE_SUCCESS = "FETCH_USER_UPDATE_SUCCESS";

export const doLogin = (data) => {
  return {
    type: FETCH_USER_LOGIN_SUCCESS,
    payload: data,
  };
};

export const doLogout = () => {
  return {
    type: FETCH_USER_LOGOUT_SUCCESS,
  };
};

export const doUpdate = (data) => {
  return {
    type: FETCH_USER_UPDATE_SUCCESS,
    payload: data,
  };
};
