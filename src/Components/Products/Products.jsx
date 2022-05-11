import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [isDeleted, setIsDeleted] = useState(false);
  useEffect(() => {
    // IFFE
    (async () => {
      const { data } = await axios.get("http://localhost:5000/products");
      console.log(data);
      if (!data?.success) return toast.error(data?.error);

      setProducts(data.data);
    })();
  }, [isDeleted]);

  const handleDelete = async id => {
    const { data } = await axios.delete(`http://localhost:5000/product/${id}`)
    if(data.success) toast.success(data.message)
    setIsDeleted(!isDeleted)
}
  return (
    <div className="mx-auto container my-12 border-2 border-slate-500 rounded-md">
      <Toaster />

      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                Image
              </th>
              <th scope="col" class="px-6 py-3">
                Product name
              </th>
              <th scope="col" class="px-6 py-3">
                Price
              </th>
              <th scope="col" class="px-6 py-3">
                <span class="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                >
                  <img
                    className="w-16 h-16 rounded"
                    src={product.imgUrl}
                    alt=""
                  />
                </th>
                <td class="px-6 py-4">{product.name}</td>
                <td class="px-6 py-4">{product.price}</td>
                <td class="px-6 py-4 text-right">
                  <button
                    onClick={() => handleDelete(product._id)}
                    class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
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
  );
};

export default Products;
