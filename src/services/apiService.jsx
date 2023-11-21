import axios from "../utils/axios";

const postCreateNewUser = (email, password, username, role, image) => {
  const userData = new FormData();
  userData.append("email", email);
  userData.append("password", password);
  userData.append("username", username);
  userData.append("role", role);
  userData.append("userImage", image);

  return axios.post("api/v1/participant", userData);
};

const getAllUsers = () => {
  return axios.get("api/v1/participant/all");
};

const putUpdateUser = (id, username, role, image) => {
  const userData = new FormData();
  userData.append("id", id);
  userData.append("username", username);
  userData.append("role", role);
  userData.append("userImage", image);

  return axios.put("api/v1/participant", userData);
};

const deleteUser = (id) => {
  return axios.delete("api/v1/participant", { data: { id } });
};

const getAllUsersWithPaginate = (page, limit) => {
  return axios.get(`api/v1/participant?page=${page}&limit=${limit}`);
};

const postLogin = (email, password) => {
  return axios.post("api/v1/login", { email, password });
};

const postSignup = (email, password, username) => {
  return axios.post("api/v1/register", { email, password, username });
};

const getQuizByUser = () => {
  return axios.get("api/v1/quiz-by-participant");
};

const getDataQuiz = (quizId) => {
  return axios.get(`api/v1/questions-by-quiz?quizId=${quizId}`);
};

const postSubmitQuiz = (data) => {
  return axios.post("api/v1/quiz-submit", { ...data });
};

const postCreateNewQuiz = (name, description, difficulty, quizImage) => {
  const quizData = new FormData();
  quizData.append("name", name);
  quizData.append("description", description);
  quizData.append("difficulty", difficulty);
  quizData.append("quizImage", quizImage);

  return axios.post("api/v1/quiz", quizData);
};

const getAllQuizzes = () => {
  return axios.get("api/v1/quiz/all");
};

const deleteQuiz = (id) => {
  return axios.delete(`api/v1/quiz/${id}`);
};

const putUpdateQuiz = (id, description, name, difficulty, quizImage) => {
  const quizData = new FormData();
  quizData.append("id", id);
  quizData.append("description", description);
  quizData.append("name", name);
  quizData.append("difficulty", difficulty);
  quizData.append("quizImage", quizImage);

  return axios.put("api/v1/quiz", quizData);
};

const postCreateNewQuestion = (quizId, description, questionImage) => {
  const questionData = new FormData();
  questionData.append("quiz_id", quizId);
  questionData.append("description", description);
  questionData.append("questionImage", questionImage);

  return axios.post("api/v1/question", questionData);
};

const postCreateNewAnswer = (questionId, description, correctAnswer) => {
  return axios.post("api/v1/answer", {
    question_id: questionId,
    description,
    correct_answer: correctAnswer,
  });
};

const postAssignQuizToUser = (quizId, userId) => {
  return axios.post("api/v1/quiz-assign-to-user", {
    quizId,
    userId,
  });
};

const getQuizWithQA = (quizId) => {
  return axios.get(`api/v1/quiz-with-qa/${quizId}`);
};

const postUpsertQA = (data) => {
  return axios.post("api/v1/quiz-upsert-qa", { ...data });
};

const postLogOut = (email, refresh_token) => {
  return axios.post("api/v1/logout", {
    email,
    refresh_token,
  });
};

const getOverview = () => {
  return axios.get("api/v1/overview");
};

const putUpdateProfileUser = (username, userImage) => {
  const profileData = new FormData();
  profileData.append("username", username);
  profileData.append("userImage", userImage);

  return axios.post("api/v1/profile", profileData);
};

const changePassword = (current_password, new_password) => {
  return axios.post("api/v1/change-password", {
    current_password,
    new_password,
  });
};

const getHistory = () => {
  return axios.get("api/v1/history");
};

export {
  postCreateNewUser,
  getAllUsers,
  putUpdateUser,
  deleteUser,
  getAllUsersWithPaginate,
  postLogin,
  postSignup,
  getQuizByUser,
  getDataQuiz,
  postSubmitQuiz,
  postCreateNewQuiz,
  getAllQuizzes,
  deleteQuiz,
  putUpdateQuiz,
  postCreateNewQuestion,
  postCreateNewAnswer,
  postAssignQuizToUser,
  getQuizWithQA,
  postUpsertQA,
  postLogOut,
  getOverview,
  putUpdateProfileUser,
  changePassword,
  getHistory,
};
