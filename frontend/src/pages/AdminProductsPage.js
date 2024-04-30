import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import Meta from "../components/Meta";
import { Link } from "react-router-dom";
import { useProductContext } from "../hooks/useProductContext";
import { toast } from "react-toastify";

import { Table, Button } from "antd";

const AdminProductsPage = () => {
  const { fetchProducts, deleteProduct, products, count, loading, error } =
    useProductContext();

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(3);

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  useEffect(() => {
    fetchProducts({ page: currentPage, pageSize, latest: true });

    if (error) {
      toast.error("Something Went Wrong!");
    }
    // eslint-disable-next-line
  }, [currentPage, pageSize]);

  const columns = [
    {
      title: "Image",
      dataIndex: "mainImage",
      key: "mainImage",
      render: (mainImage) => (
        <img className="w-20 h-20 object-contain" src={mainImage} alt="" />
      ),
    },
    {
      title: "Product Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Edit",
      dataIndex: "slug",
      key: "slug",
      render: (slug) => (
        <Link to={`/admin/edit-product/${slug}`}>
          <Button type="primary">Edit</Button>
        </Link>
      ),
    },
    {
      title: "Delete",
      dataIndex: "_id",
      key: "_id",
      render: (_id) => (
        <Button danger onClick={() => deleteProduct(_id)}>
          Delete
        </Button>
      ),
    },
  ];

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
              Products management
            </h1>
            <p className="text-gray-500 my-2">
              Manage products, create, update and delete.
            </p>
          </div>

          <div className="col-span-2 py-4 px-2 md:px-8">
            <div className="flex gap-x-8 justify-center">
              <Link to="/admin/products">
                <button className="text-gray-600 underline">Products</button>
              </Link>
              <Link to="/admin/orders">
                <button className="text-gray-600">Orders</button>
              </Link>
            </div>
            <div className="md:p-8 my-8">
              <Link
                className="inline-block mb-6 rounded shadow-sm bg-gray-50 border text-orange-600 font-medium py-2 px-4 uppercase hover:bg-gray-100"
                to="/admin/add-product"
              >
                Add new product
              </Link>

              <Table
                columns={columns}
                dataSource={products}
                loading={loading}
                pagination={{
                  total: count,
                  pageSize,
                  showSizeChanger: true,
                  pageSizeOptions: ["3", "5", "10", "20"],
                  showTotal: (total) => `Total ${total} items`,
                  current: currentPage,
                  onChange: handlePageChange,
                  onShowSizeChange: handlePageChange,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminProductsPage;
