import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Meta from "../components/Meta";
import { Link } from "react-router-dom";
import { useProductContext } from "../hooks/useProductContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useOrdersContext from "../hooks/useOrdersContext";
import { Table, Tag, Space, Button } from "antd";
import API_URL from "../utils/setupApi";

const AdminDashboard = () => {
  // switch between orders and products
  const [switchToProducts, setSwitchToProducts] = useState(false);

  return (
    <Layout>
      <Meta title="Admin Dashboard | Instrumental Shop" />
      <div className="max-w-7xl mx-auto md:my-8">
        <div className="grid grid-cols-1 md:grid-cols-3 md:gap-8">
          <div className="py-4 px-8 md:border-r text-center md:text-left border-r-gray-200">
            <h1
              className="text-4xl font-medium my-4"
              style={{ color: "#153a5b" }}
            >
              {switchToProducts ? "Products" : "Orders"} management
            </h1>
            <p className="text-gray-500 my-2">
              {!switchToProducts &&
                "Track and view order details or easily reorder products."}
              {switchToProducts &&
                "Manage products, create, update and delete."}
            </p>
          </div>

          <div className="col-span-2 py-4 px-8">
            <div className="flex gap-x-8 justify-center">
              <button
                onClick={() => setSwitchToProducts(false)}
                className={`text-gray-600 ${!switchToProducts && "underline"}`}
              >
                Orders
              </button>
              <button
                onClick={() => setSwitchToProducts(true)}
                className={`text-gray-600 ${switchToProducts && "underline"}`}
              >
                Products
              </button>
            </div>

            {/* orders management */}
            {!switchToProducts && <OrdersManagement />}

            {/* products management */}
            {switchToProducts && <ProductsManagement />}
          </div>
        </div>
      </div>
    </Layout>
  );
};

function TableComponent(props) {
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
}

const OrdersManagement = () => {
  const { getOrders, orders, loading, error } = useOrdersContext();

  useEffect(() => {
    getOrders();

    // eslint-disable-next-line
  }, []);

  return (
    <div className="md:p-8 my-8 col-span-2">
      {loading && <h1>Loading...</h1>}
      {error && <h1>{error}</h1>}

      <ToastContainer />
      {orders && <TableComponent data={orders} />}

      {/* No orders */}
      {orders && orders.length === 0 && (
        <div className="h-32 my-12 flex items-center justify-center rounded shadow-sm md:border border-gray-100">
          <div className="p-4">No orders yet!</div>
        </div>
      )}
    </div>
  );
};

const ProductsManagement = () => {
  const { fetchProducts, deleteProduct, products, loading, error } =
    useProductContext();

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="md:p-8 mt-8 mb-16">
      {/* Create Product */}
      <Link
        className="inline-block mb-10 rounded shadow-sm bg-gray-50 border text-orange-600 font-medium py-2 px-4 uppercase hover:bg-gray-100"
        to="/admin/add-product"
      >
        Add new product
      </Link>
      {loading && <h1 className="text-xl my-4">Loading...</h1>}
      {error && <h1 className="text-xl text-red-700">{error}</h1>}
      {products &&
        products.map((prod) => (
          <div
            key={prod._id}
            className="flex py-2 shadow-sm mb-2 border-b border-gray-100 items-center justify-between"
          >
            {/* Image */}
            <div className="w-14 h-14">
              <img
                className="w-full h-full object-contain"
                src={prod.mainImage}
                alt={`${prod.name} main`}
              />
            </div>
            {/* Title */}
            <Link
              to={`/${prod.collectionRef.name}/${prod.slug}`}
              className="w-2/3 hover:underline hover:text-orange-600"
            >
              {prod.name}{" "}
            </Link>
            <Link
              to={`/admin/edit-product/${prod.slug}`}
              className="inline-block py-2 px-4 bg-orange-400 hover:bg-orange-500 text-white shadow-sm rounded text-sm"
            >
              EDIT
            </Link>
            <button
              onClick={() => deleteProduct(prod._id)}
              className="inline-block py-2 px-4 rounded shadow-sm hover:bg-red-600 hover:text-white text-red-600 text-sm"
            >
              DELETE
            </button>
          </div>
        ))}
    </div>
  );
};

export default AdminDashboard;
