import _ from "lodash";
import React, { useEffect, useState } from "react";
import { getAllUsers, putUpdateProfileUser } from "../../services/apiService";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { doUpdate } from "../../redux/action/userAction";

const Information = () => {
  const dispatch = useDispatch();

  const account = useSelector((state) => state.user.account);

  const [imagePreview, setImagePreview] = useState("");
  const [image, setImage] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("USER");

  useEffect(() => {
    if (!_.isEmpty(account)) {
      const { username, email, role, image } = account;
      setUsername(username);
      setEmail(email);
      setRole(role);
      if (image) {
        setImage(`data:image/*;base64,${image}`);
      }
    }
    fetchAllUsers();
  }, [account]);

  const fetchAllUsers = async () => {
    let data = await getAllUsers();
    if (data && data.EC === 0) {
      let user = data.DT.filter((user) => user.email === account.email);
      setImagePreview(`data:image/*;base64,${user[0].image}`);
    }
  };

  const toBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleSubmitUser = async () => {
    if (!username) {
      toast.warn("Username is required!");
      return;
    }

    if (!image) {
      toast.warn("Image is required!");
      return;
    }

    try {
      let imageBase64 = image;
      if (image instanceof File) {
        // Chỉ chuyển đổi nếu image là một đối tượng File
        imageBase64 = await toBase64(image);
      }

      let data = await putUpdateProfileUser(username, image);
      if (data && data.EC === 0) {
        toast.success(`${data.EM}`);
        dispatch(doUpdate({ username, image: imageBase64 }));
      }
    } catch (error) {
      console.error("Error in image processing: ", error);
    }
  };

  return (
    <>
      <div className="row g-3">
        <div className="col-md-6">
          <label htmlFor="inputEmail" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="inputEmail"
            placeholder="Email"
            value={email}
            disabled
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="inputRole" className="form-label">
            Role
          </label>
          <input
            type="text"
            className="form-control"
            id="inputRole"
            placeholder="Role"
            value={role}
            disabled
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="inputUsername" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="inputUsername"
            placeholder="Username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div className="col-md-12">
          <label htmlFor="inputImage" className="form-label">
            Image
          </label>
          <input
            type="file"
            className="form-control"
            aria-label="file image"
            required
            onChange={(event) => {
              setImagePreview(URL.createObjectURL(event.target.files[0]));
              setImage(event.target.files[0]);
            }}
            accept="image/*"
          />
          {imagePreview && (
            <div className="image-preview">
              <img
                src={imagePreview}
                alt="Preview"
                style={{
                  margin: "10px",
                  maxWidth: "50%",
                  height: "auto",
                }}
              />
            </div>
          )}
        </div>
      </div>
      <button className="btn btn-primary" onClick={handleSubmitUser}>
        Save
      </button>
    </>
  );
};

export default Information;
