import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
// import User from "./components/User/User.jsx";
import Admin from "./components/Admin/Admin.jsx";
import HomePage from "./components/Home/HomePage.jsx";
import ManageUser from "./components/Admin/content/ManageUser.jsx";
import Dashboard from "./components/Admin/content/Dashboard.jsx";
import Login from "./components/Auth/Login.jsx";
import Signup from "./components/Auth/SignUp.jsx";
import { ToastContainer } from "react-toastify";
import { PersistGate } from "redux-persist/integration/react";
import ListQuiz from "./components/User/ListQuiz.jsx";
import DetailsQuiz from "./components/User/DetailsQuiz.jsx";
import NotFound from "./components/NotFound/NotFound.jsx";
import ManageQuiz from "./components/Admin/content/Quiz/ManageQuiz.jsx";
import ManageQuestion from "./components/Admin/content/Question/ManageQuestion.jsx";
import PrivateRoute from "./routes/PrivateRoute.jsx";
import i18n from "./utils/i18n.jsx";

import "react-perfect-scrollbar/dist/css/styles.css";
import "nprogress/nprogress.css";
import "react-awesome-lightbox/build/style.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      {/* <React.StrictMode> */}
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<App />}>
              {/* Khi truyền attribute index thì sẽ hiển thị giao diện của component vào Outlet của Route cha */}
              <Route index element={<HomePage />} />
              <Route
                path="user"
                element={
                  <PrivateRoute>
                    <ListQuiz />
                  </PrivateRoute>
                }
              />
            </Route>

            <Route path="/quiz/:id" element={<DetailsQuiz />} />

            <Route path="/admin" element={<Admin />}>
              <Route index element={<Dashboard />} />
              <Route path="manage-user" element={<ManageUser />} />
              <Route path="manage-quiz" element={<ManageQuiz />} />
              <Route path="manage-question" element={<ManageQuestion />} />
            </Route>

            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </Suspense>
      </BrowserRouter>
      {/* </React.StrictMode> */}
    </PersistGate>
  </Provider>
);
