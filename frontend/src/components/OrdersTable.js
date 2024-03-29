import { Table, Tag, Space, Button } from "antd";
import { useState, useEffect } from "react";
import API_URL from "../utils/setupApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OrdersTable = (props) => {
  const columns = [
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => new Date(createdAt).toLocaleString(),
    },
    {
      title: "Items",
      dataIndex: "orderItems",
      key: "orderItems",
      render: (orderItems, record) => (
        <>
          <div>
            <Space>
              {orderItems[0].name}
              {"Qty: "}
              {orderItems[0].qty}
            </Space>
          </div>
          {orderItems.length > 1 && (
            <div>
              <Button type="link" onClick={() => handleExpandToggle(record)}>
                {record.expanded
                  ? "Collapse"
                  : `Expand +${orderItems.length - 1}`}
              </Button>
              {record.expanded && (
                <>
                  {orderItems.slice(1).map((item, index) => (
                    <div key={index}>
                      <Space>
                        <li>
                          {item.name}
                          {"Qty: "}
                          {item.qty}
                        </li>
                      </Space>
                    </div>
                  ))}
                </>
              )}
            </div>
          )}
        </>
      ),
    },
    {
      title: "Total",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (totalPrice) => <>{`$ ${totalPrice}`}</>,
    },
    {
      title: "Shipping Address",
      dataIndex: "shippingAddress",
      key: "shippingAddress",
      render: (shippingAddress) => (
        <>{`${shippingAddress.address}, ${shippingAddress.city}, ${shippingAddress.postalCode}, ${shippingAddress.country}`}</>
      ),
    },
    {
      title: "Status",
      key: "isDelivered",
      dataIndex: "isDelivered",
      render: (isDelivered, record) => (
        <>
          {isDelivered ? (
            <Button type="primary" onClick={() => handleOrderStatus(record)}>
              <Tag color="green">Delivered</Tag>
            </Button>
          ) : (
            <Button type="danger" onClick={() => handleOrderStatus(record)}>
              <Tag color="red">Not Delivered</Tag>
            </Button>
          )}
        </>
      ),
    },
  ];

  const [data, setData] = useState(props.data);

  const handleOrderStatus = async (record) => {
    try {
      const res = await fetch(`${API_URL}/api/orders/${record._id}/deliver`, {
        method: "PUT",
        body: JSON.stringify({
          orderId: record._id,
          isDelivered: !record.isDelivered,
        }),
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${JSON.parse(
            localStorage.getItem("instrumental_auth_token")
          )}`,
        },
      });

      const { error, success } = await res.json();

      if (success) {
        console.log("Success");

        const newData = data.map((item) => {
          if (item._id === record._id) {
            item.isDelivered = !item.isDelivered;
          }
          return item;
        });
        setData(newData);
      }

      if (error) {
        toast.error(JSON.stringify(error));
      }
    } catch (error) {
      JSON.stringify({ catch: "CATCH", error });
    }
  };

  const handleExpandToggle = (record) => {
    const newData = data.map((item) => {
      if (item._id === record._id) {
        return {
          ...item,

          expanded: !record.expanded,
        };
      }
      return item;
    });
    setData(newData);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  useEffect(() => {}, [data]);

  return (
    <>
      <ToastContainer />
      <Table
        columns={columns}
        dataSource={data.slice(
          (currentPage - 1) * pageSize,
          currentPage * pageSize
        )}
        pagination={{
          total: data.length,
          pageSize,
          showSizeChanger: true,
          pageSizeOptions: ["5", "10", "20", "50"],
          showTotal: (total) => `Total ${total} items`,
          onChange: (page) => {
            setCurrentPage(page);
          },
          onShowSizeChange: (current, size) => {
            setPageSize(size);
            setCurrentPage(1);
          },
        }}
      />
    </>
  );
};

export default OrdersTable;
