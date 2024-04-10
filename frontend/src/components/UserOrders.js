import { useEffect } from "react";
import { Link } from "react-router-dom";
import useOrdersContext from "../hooks/useOrdersContext";
import { Table, Button, Space, Tag } from "antd";

const UserOrders = () => {
  const { getUserOrders, deleteOrder, userOrders, loading } =
    useOrdersContext();

  useEffect(() => {
    getUserOrders();

    // eslint-disable-next-line
  }, []);

  const columns = [
    {
      title: "Items",
      dataIndex: "orderItems",
      key: "orderItems",
      render: (orderItems, record) => (
        <>
          <div>
            <Space>
              {orderItems[0].name}
              {`x${orderItems[0].qty}`}
            </Space>
          </div>
        </>
      ),
    },
    {
      title: "Total",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (totalPrice) => <>{`$${totalPrice}`}</>,
    },
    {
      title: "Delivery Status",
      dataIndex: "isDelivered",
      key: "isDelivered",
      render: (isDelivered, record) =>
        isDelivered ? (
          <Tag color="green">Delivered</Tag>
        ) : !isDelivered && !record.isPaid ? (
          <Tag color="gold">Pending Payment</Tag>
        ) : (
          <Tag color="blue">In Transit</Tag>
        ),
    },
    {
      title: "Details",
      dataIndex: "_id",
      key: "_id",
      render: (_id) => (
        <Link to={`/orders/${_id}`}>
          <Button type="text">Details</Button>
        </Link>
      ),
    },
    {
      title: "Delete",
      dataIndex: "_id",
      key: "_id",
      render: (_id, record) => (
        <Button danger onClick={() => deleteOrder(_id)}>
          {record.isPaid ? "Delete" : "Cancel order"}
        </Button>
      ),
    },
  ];

  return (
    <div className="md:p-8 my-8 col-span-2 w-full">
      <Table
        loading={loading}
        dataSource={userOrders}
        columns={columns}
        rowKey={(record) => record._id}
        pagination={false}
      />
    </div>
  );
};

export default UserOrders;
