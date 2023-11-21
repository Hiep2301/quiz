import React, { useState } from "react";
import { toast } from "react-toastify";
import { changePassword } from "../../services/apiService";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const handleSubmit = async () => {
    if (!currentPassword) {
      toast.warn("Current Password is required!");
      return;
    }

    if (!newPassword) {
      toast.warn("New Password is required!");
      return;
    }

    if (!confirmNewPassword) {
      toast.warn("Confirm New Password is required!");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      toast.warn("New Password and Confirm New Password must be the same!");
      return;
    }

    let data = await changePassword(currentPassword, newPassword);
    if (data && data.EC === 0) {
      toast.success("Change Password Successfully!");
    } else {
      toast.error("Change Password Failed!");
    }
  };

  return (
    <>
      <div className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Current Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Current Password"
            value={currentPassword}
            onChange={(event) => setCurrentPassword(event.target.value)}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="inputRole" className="form-label">
            New Password
          </label>
          <input
            type="password"
            className="form-control"
            placeholder="New Password"
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Confirm Password"
            value={confirmNewPassword}
            onChange={(event) => setConfirmNewPassword(event.target.value)}
          />
        </div>
      </div>
      <button className="btn btn-primary mt-3" onClick={handleSubmit}>
        Save
      </button>
    </>
  );
};

export default ChangePassword;
