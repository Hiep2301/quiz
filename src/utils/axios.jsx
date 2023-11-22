import axios from "axios";
import NProgress from "nprogress";
import { store } from "../redux/store";
import { doLogout } from "../redux/action/userAction";

// thư viện loading dạng bar khi call api
NProgress.configure({
  showSpinner: false,
  trickleSpeed: 100,
});

// Tạo một instance axios với cấu hình baseURL
const instance = axios.create({
  baseURL: "http://localhost:8081/", // URL cơ sở cho mọi request
});

// Thêm một interceptor request để xử lý trước khi gửi mọi request
instance.interceptors.request.use(
  function (config) {
    // Lấy token truy cập từ trạng thái Redux
    const access_token = store?.getState()?.user?.account?.access_token;
    if (access_token) {
      // Nếu token tồn tại, thêm nó vào header của request
      config.headers["Authorization"] = `Bearer ${access_token}`;
    }
    // Chạy tiến trình progressbar
    NProgress.start();

    // Trả về cấu hình đã được chỉnh sửa
    return config;
  },
  function (error) {
    // Xử lý lỗi trong trường hợp không tạo được request
    return Promise.reject(error);
  }
);

// Thêm một interceptor response để xử lý dữ liệu hoặc lỗi trả về từ server
instance.interceptors.response.use(
  function (response) {
    // Dừng NProgress sau khi nhận được response
    NProgress.done();

    // Trả về dữ liệu từ phản hồi, hoặc toàn bộ phản hồi nếu không có dữ liệu
    return response && response?.data ? response.data : response;
  },
  function (error) {
    NProgress.done();

    // Nếu token hết hạn (dựa vào mã lỗi -999), thực hiện logout
    if (error.response.data && error.response.data.EC === -999) {
      store.dispatch(doLogout());
    }

    // Xử lý lỗi từ phản hồi và trả về lỗi hoặc reject nếu không có dữ liệu lỗi
    return error && error.response && error.response.data
      ? error.response.data
      : Promise.reject(error);
  }
);

export default instance;
