import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { toast } from "react-toastify";

const UserAccount = () => {
  const {
    user,
    updateDetails,
    updateUserLoading,
    updateUserError,
    updateSuccess,
    updatePassword,
    updatePasswordLoading,
    updatePasswordError,
    passwordSuccess,
    resetUserState,
  } = useAuthContext();

  const [userInfo, setUser] = useState({
    firstName: user?.firstName,
    lastName: user?.lastName,
    email: user?.email,
  });

  // Personal info
  const [infoActive, setInfoActive] = useState(false);
  const onChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    updateDetails(userInfo);
  };

  // Update password
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordActive, setPasswordActive] = useState(false);

  const onUpdatePassword = (e) => {
    e.preventDefault();
    updatePassword(currentPassword, newPassword);
  };

  useEffect(() => {
    resetUserState();
    setInfoActive(false);
    if (updateUserError) {
      toast.error(updateUserError);
      setUser({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      });
    }

    if (updateSuccess) {
      toast.success("Profile updated successfully");
    }

    if (updatePasswordError) {
      toast.error(updatePasswordError);
    }

    if (passwordSuccess) {
      setPasswordActive(false);
      toast.success("Password changed successfully");
    }

    //eslint-disable-next-line
  }, [
    updateSuccess,
    updateUserError,
    user.firstName,
    user.lastName,
    user.email,
    updatePasswordError,
    passwordSuccess,
  ]);

  return (
    <div className="md:p-8 mt-8 mb-16">
      {/* Personal info */}
      <div className="bg-gray-50 p-4 mb-8">
        <h3 className="text-xl my-4 text-gray-700 font-medium">
          Personal information
        </h3>
        <form onSubmit={onSubmit}>
          <div className="my-3 flex items-center justify-between">
            <label htmlFor="firstName">First Name</label>
            <input
              className={`py-2 px-4 w-3/5 rounded-sm shadow-sm border-gray-100 disabled:border-none disabled:bg-inherit disabled:shadow-none`}
              disabled={!infoActive}
              type="text"
              name="firstName"
              value={userInfo.firstName}
              onChange={onChange}
            />
          </div>
          <div className="my-3 flex items-center justify-between">
            <label htmlFor="lastName">Last Name</label>
            <input
              className={`py-2 px-4 w-3/5 rounded-sm shadow-sm border-gray-100 disabled:border-none disabled:bg-inherit disabled:shadow-none`}
              disabled={!infoActive}
              type="text"
              name="lastName"
              value={userInfo.lastName}
              onChange={onChange}
            />
          </div>
          <div className="my-3 flex items-center justify-between">
            <label htmlFor="email">Email</label>
            <input
              className={`py-2 px-4 w-3/5 rounded-sm shadow-sm border-gray-100 disabled:border-none disabled:bg-inherit disabled:shadow-none`}
              disabled={!infoActive}
              type="text"
              name="email"
              value={userInfo.email}
              onChange={onChange}
            />
          </div>

          {updateUserLoading && <h1>Loading...</h1>}

          {infoActive && (
            <div className="my-4 flex gap-2">
              <button
                type="submit"
                className="my-2 py-2 px-4 text-white rounded shadow-sm bg-orange-600 hover:bg-orange-700"
              >
                Save
              </button>

              <button
                type="button"
                onClick={() => setInfoActive(false)}
                className="my-2 py-2 px-4 rounded shadow-sm bg-gray-200 hover:bg-gray-100 hover:shadow"
              >
                Cancel
              </button>
            </div>
          )}
        </form>

        {!infoActive && (
          <div className="my-4">
            <button
              onClick={() => setInfoActive(true)}
              className="my-2 py-2 px-4 rounded shadow-sm bg-gray-200 hover:bg-gray-300"
            >
              Edit profile
            </button>
          </div>
        )}
      </div>

      {/* Change password */}
      <div className="bg-gray-50 p-4 mb-4">
        <h3 className="text-xl my-4 text-gray-700 font-medium">
          Update password
        </h3>

        {updatePasswordLoading && <h1>Loading...</h1>}

        {passwordActive && (
          <form onSubmit={onUpdatePassword}>
            <div className="my-3 flex items-center justify-between">
              <label htmlFor="currentPassword">Current Password</label>
              <input
                className="py-2 px-4 w-3/5 rounded-sm shadow-sm border-gray-100"
                type="text"
                name="currentPassword"
                placeholder="Your current password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>
            <div className="my-3 flex items-center justify-between">
              <label htmlFor="newPassword">New Password</label>
              <input
                className="py-2 px-4 w-3/5 rounded-sm shadow-sm border-gray-100"
                placeholder="Your new password"
                type="text"
                name="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-3 my-4">
              <button
                type="submit"
                className="py-2 px-4 text-white rounded shadow-sm bg-orange-600 hover:bg-orange-700"
              >
                Update password
              </button>
              <button
                type="button"
                onClick={() => setPasswordActive(false)}
                className="py-2 px-4 bg-gray-200 hover:bg-gray-300 rounded shadow-sm my-2"
              >
                Undo
              </button>
            </div>
          </form>
        )}

        {!passwordActive && (
          <button
            onClick={() => setPasswordActive(true)}
            className="py-2 px-4 bg-gray-200 hover:bg-gray-300 rounded shadow-sm my-2"
          >
            Change password
          </button>
        )}
      </div>
    </div>
  );
};

export default UserAccount;
