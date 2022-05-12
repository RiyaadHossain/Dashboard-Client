import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [isDeleted, setIsDeleted] = useState(false);
  const [limit, setLimit] = useState(5);
  const [pageNumber, setPageNumber] = useState(0);

  useEffect(() => {
    // IFFE
    (async () => {
      const { data } = await axios.get(
        `http://localhost:5000/products?limit=${limit}&pageNumber=${pageNumber}`
      );
      if (!data?.success) return toast.error(data?.error);

      setProducts(data.data);
    })();
  }, [isDeleted, limit, pageNumber]);
  console.dir(limit, pageNumber);
  const handleDelete = async (id) => {
    const { data } = await axios.delete(`http://localhost:5000/product/${id}`);
    if (data.success) toast.success(data.message);
    setIsDeleted(!isDeleted);
  };
  return (
    <>
      <div className="mx-auto container my-12 border-2 border-slate-500 rounded-md">
        <Toaster />

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Image
                </th>
                <th scope="col" className="px-6 py-3">
                  Product name
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, i) => (
                <tr
                  key={i}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                  >
                    <img
                      className="w-16 h-16 rounded"
                      src={product.imgUrl}
                      alt=""
                    />
                  </th>
                  <td className="px-6 py-4">{product.name}</td>
                  <td className="px-6 py-4">{product.price}</td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="text-center">
        {[...Array(5).keys()].map((page) => (
          <button
            onClick={() => setPageNumber(page)}
            className={`mx-5 border-2 border-blue-600 py-1 font-bold px-3 ${
              page === pageNumber ? "bg-blue-600 text-white" : ""
            }`}
          >
            {page + 1}
          </button>
        ))}
      <select
        id="countries"
        onChange={(e) => setLimit(e.target.value)}
        class="bg-gray-50 border w-16 font-bold inline-block border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="15">15</option>
        <option value="20">20</option>
      </select>
      </div>

    </>
  );
};

export default Products;
