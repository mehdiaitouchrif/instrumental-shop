import { Table, Tag, Space, Button } from "antd";
import { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import useOrdersContext from "../hooks/useOrdersContext";

const OrdersTable = () => {
  const {
    getOrders,
    orders,
    page,
    count,
    loading,
    toggleOrderExpanded,
    toggleDeliveryStatus,
  } = useOrdersContext();
  const [currentPage, setCurrentPage] = useState(page);
  const [pageSize, setPageSize] = useState(3);

  useEffect(() => {
    getOrders(currentPage, pageSize);

    // eslint-disable-next-line
  }, [currentPage, pageSize]);

  const handleOrderStatus = async (record) => {
    toggleDeliveryStatus(record);
  };
  const handleExpandToggle = (record) => {
    toggleOrderExpanded(record._id);
  };

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

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

  return (
    <Table
      columns={columns}
      dataSource={orders}
      loading={loading}
      pagination={{
        total: count,
        pageSize,
        showSizeChanger: true,
        pageSizeOptions: ["3", "5", "10"],
        showTotal: (total) => `Total ${total} items`,
        current: currentPage,
        onChange: handlePageChange,
        onShowSizeChange: handlePageChange,
      }}
    />
  );
};

export default OrdersTable;
