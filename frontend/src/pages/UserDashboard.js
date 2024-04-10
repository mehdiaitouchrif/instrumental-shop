import { useState } from "react";
import Layout from "../components/Layout";
import Meta from "../components/Meta";
import UserOrders from "../components/UserOrders";
import UserAccount from "../components/UserAccount";

const UserDashboard = () => {
  // switch between orders and settings
  const [switchToAcc, setSwitchToAcc] = useState(false);

  return (
    <Layout>
      <Meta title="My Dashboard | Instrumental Shop" />
      <div className="max-w-6xl mx-auto md:my-8">
        <div className="grid grid-cols-1 md:grid-cols-3 md:gap-8">
          <div className="py-4 px-8 md:border-r text-center md:text-left border-r-gray-200">
            <h1
              className="text-4xl font-medium my-4"
              style={{ color: "#153a5b" }}
            >
              {switchToAcc ? "Account" : "Orders"} management
            </h1>
            <p className="text-gray-500 my-2">
              {!switchToAcc &&
                "Track and view order details or easily reorder products."}
              {switchToAcc && "Manage your contact information and password."}
            </p>
          </div>

          <div className="col-span-2 py-4 px-8">
            <div className="flex gap-x-8 justify-center">
              <button
                onClick={() => setSwitchToAcc(false)}
                className={`text-gray-600 ${!switchToAcc && "underline"}`}
              >
                Orders
              </button>
              <button
                onClick={() => setSwitchToAcc(true)}
                className={`text-gray-600 ${switchToAcc && "underline"}`}
              >
                Account
              </button>
            </div>

            {/* User orders */}
            {!switchToAcc && <UserOrders />}

            {/* Account settings */}
            {switchToAcc && <UserAccount />}
          </div>
        </div>
      </div>
    </Layout>
  );
};

// const UserOrders = () => {
//   const { getUserOrders, deleteOrder, userOrders, loading } =
//     useOrdersContext();

//   useEffect(() => {
//     getUserOrders();

//     // eslint-disable-next-line
//   }, []);

//   const columns = [
//     {
//       title: "Items",
//       dataIndex: "orderItems",
//       key: "orderItems",
//       render: (orderItems, record) => (
//         <>
//           <div>
//             <Space>
//               {orderItems[0].name}
//               {`x${orderItems[0].qty}`}
//             </Space>
//           </div>
//         </>
//       ),
//     },
//     {
//       title: "Total",
//       dataIndex: "totalPrice",
//       key: "totalPrice",
//       render: (totalPrice) => <>{`$${totalPrice}`}</>,
//     },
//     {
//       title: "Delivery Status",
//       dataIndex: "isDelivered",
//       key: "isDelivered",
//       render: (isDelivered, record) =>
//         isDelivered ? (
//           <Tag color="green">Delivered</Tag>
//         ) : !isDelivered && !record.isPaid ? (
//           <Tag color="gold">Pending Payment</Tag>
//         ) : (
//           <Tag color="blue">In Transit</Tag>
//         ),
//     },
//     {
//       title: "Details",
//       dataIndex: "_id",
//       key: "_id",
//       render: (_id) => (
//         <Link to={`/orders/${_id}`}>
//           <Button type="text">Details</Button>
//         </Link>
//       ),
//     },
//     {
//       title: "Cancel",
//       dataIndex: "_id",
//       key: "_id",
//       render: (_id, record) => (
//         <Button danger onClick={() => deleteOrder(_id)}>
//           {record.isPaid ? "Delete" : "Cancel order"}
//         </Button>
//       ),
//     },
//   ];

//   return (
//     <div className="md:p-8 my-8 col-span-2 w-full">
//       <Table
//         loading={loading}
//         dataSource={userOrders}
//         columns={columns}
//         rowKey={(record) => record._id}
//         pagination={false}
//       />
//     </div>
//   );
// };

// const UserAccount = () => {
//   const {
//     user,
//     updateDetails,
//     updateUserLoading,
//     updateUserError,
//     updateSuccess,
//     updatePassword,
//     updatePasswordLoading,
//     updatePasswordError,
//     passwordSuccess,
//     resetUserState,
//   } = useAuthContext();

//   const [userInfo, setUser] = useState({
//     firstName: user?.firstName,
//     lastName: user?.lastName,
//     email: user?.email,
//   });

//   // Personal info
//   const [infoActive, setInfoActive] = useState(false);
//   const onChange = (e) => {
//     setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const onSubmit = (e) => {
//     e.preventDefault();
//     updateDetails(userInfo);
//   };

//   // Update password
//   const [currentPassword, setCurrentPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [passwordActive, setPasswordActive] = useState(false);

//   const onUpdatePassword = (e) => {
//     e.preventDefault();
//     updatePassword(currentPassword, newPassword);
//   };

//   useEffect(() => {
//     resetUserState();
//     setInfoActive(false);
//     if (updateUserError) {
//       toast.error(updateUserError);
//       setUser({
//         firstName: user.firstName,
//         lastName: user.lastName,
//         email: user.email,
//       });
//     }

//     if (updateSuccess) {
//       toast.success("Profile updated successfully");
//     }

//     if (updatePasswordError) {
//       toast.error(updatePasswordError);
//     }

//     if (passwordSuccess) {
//       setPasswordActive(false);
//       toast.success("Password changed successfully");
//     }

//     //eslint-disable-next-line
//   }, [
//     updateSuccess,
//     updateUserError,
//     user.firstName,
//     user.lastName,
//     user.email,
//     updatePasswordError,
//     passwordSuccess,
//   ]);

//   return (
//     <div className="md:p-8 mt-8 mb-16">
//       {/* Personal info */}
//       <div className="bg-gray-50 p-4 mb-8">
//         <h3 className="text-xl my-4 text-gray-700 font-medium">
//           Personal information
//         </h3>
//         <form onSubmit={onSubmit}>
//           <div className="my-3 flex items-center justify-between">
//             <label htmlFor="firstName">First Name</label>
//             <input
//               className={`py-2 px-4 w-3/5 rounded-sm shadow-sm border-gray-100 disabled:border-none disabled:bg-inherit disabled:shadow-none`}
//               disabled={!infoActive}
//               type="text"
//               name="firstName"
//               value={userInfo.firstName}
//               onChange={onChange}
//             />
//           </div>
//           <div className="my-3 flex items-center justify-between">
//             <label htmlFor="lastName">Last Name</label>
//             <input
//               className={`py-2 px-4 w-3/5 rounded-sm shadow-sm border-gray-100 disabled:border-none disabled:bg-inherit disabled:shadow-none`}
//               disabled={!infoActive}
//               type="text"
//               name="lastName"
//               value={userInfo.lastName}
//               onChange={onChange}
//             />
//           </div>
//           <div className="my-3 flex items-center justify-between">
//             <label htmlFor="email">Email</label>
//             <input
//               className={`py-2 px-4 w-3/5 rounded-sm shadow-sm border-gray-100 disabled:border-none disabled:bg-inherit disabled:shadow-none`}
//               disabled={!infoActive}
//               type="text"
//               name="email"
//               value={userInfo.email}
//               onChange={onChange}
//             />
//           </div>

//           {updateUserLoading && <h1>Loading...</h1>}

//           {infoActive && (
//             <div className="my-4 flex gap-2">
//               <button
//                 type="submit"
//                 className="my-2 py-2 px-4 text-white rounded shadow-sm bg-orange-600 hover:bg-orange-700"
//               >
//                 Save
//               </button>

//               <button
//                 type="button"
//                 onClick={() => setInfoActive(false)}
//                 className="my-2 py-2 px-4 rounded shadow-sm bg-gray-200 hover:bg-gray-100 hover:shadow"
//               >
//                 Cancel
//               </button>
//             </div>
//           )}
//         </form>

//         {!infoActive && (
//           <div className="my-4">
//             <button
//               onClick={() => setInfoActive(true)}
//               className="my-2 py-2 px-4 rounded shadow-sm bg-gray-200 hover:bg-gray-300"
//             >
//               Edit profile
//             </button>
//           </div>
//         )}
//       </div>

//       {/* Change password */}
//       <div className="bg-gray-50 p-4 mb-4">
//         <h3 className="text-xl my-4 text-gray-700 font-medium">
//           Update password
//         </h3>

//         {updatePasswordLoading && <h1>Loading...</h1>}

//         {passwordActive && (
//           <form onSubmit={onUpdatePassword}>
//             <div className="my-3 flex items-center justify-between">
//               <label htmlFor="currentPassword">Current Password</label>
//               <input
//                 className="py-2 px-4 w-3/5 rounded-sm shadow-sm border-gray-100"
//                 type="text"
//                 name="currentPassword"
//                 placeholder="Your current password"
//                 value={currentPassword}
//                 onChange={(e) => setCurrentPassword(e.target.value)}
//               />
//             </div>
//             <div className="my-3 flex items-center justify-between">
//               <label htmlFor="newPassword">New Password</label>
//               <input
//                 className="py-2 px-4 w-3/5 rounded-sm shadow-sm border-gray-100"
//                 placeholder="Your new password"
//                 type="text"
//                 name="newPassword"
//                 value={newPassword}
//                 onChange={(e) => setNewPassword(e.target.value)}
//               />
//             </div>

//             <div className="flex items-center gap-3 my-4">
//               <button
//                 type="submit"
//                 className="py-2 px-4 text-white rounded shadow-sm bg-orange-600 hover:bg-orange-700"
//               >
//                 Update password
//               </button>
//               <button
//                 type="button"
//                 onClick={() => setPasswordActive(false)}
//                 className="py-2 px-4 bg-gray-200 hover:bg-gray-300 rounded shadow-sm my-2"
//               >
//                 Undo
//               </button>
//             </div>
//           </form>
//         )}

//         {!passwordActive && (
//           <button
//             onClick={() => setPasswordActive(true)}
//             className="py-2 px-4 bg-gray-200 hover:bg-gray-300 rounded shadow-sm my-2"
//           >
//             Change password
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

export default UserDashboard;
