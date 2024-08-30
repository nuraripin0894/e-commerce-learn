import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Pagination,
  useDisclosure,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDebounce } from "use-debounce";
import ProductsApi from "../apis/ProductsApi";
import { CloseFilledIcon, SearchIcon } from "../assets/icons";

const columns = [
  { id: "no", label: "No.", className: "py-3.5 pl-4 pr-3 sm:pl-6" },
  { id: "name", label: "Name", className: "py-3.5 pr-3" },
  { id: "price", label: "Price", className: "py-3.5 pr-3" },
  { id: "stock", label: "Stock", className: "py-3.5 pr-3" },
  { id: "category", label: "Category", className: "py-3.5 pr-3" },
  {
    id: "actions",
    label: "Actions",
    className: "py-3.5 pl-3 pr-4 sm:pr-6 text-center",
  },
];

function ProductsPage() {
  // const { product, setProduct } = useState(null);
  // const isLoading = useSelector((state) => state.products.isLoading);
  const productList = useSelector((state) => state.products.items);
  const total = useSelector((state) => state.products.total);
  const error = useSelector((state) => state.products.error);

  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [debounceSearchQuery] = useDebounce(searchQuery, 700);
  const [productToBeDeleted, setProductTobeDeleted] = useState();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const createProductHandler = () => {
    navigate("/dashboard/products/new");
  };

  const updateProductHandler = (product) => () => {
    navigate(`/dashboard/products/${product.id}`, { state: { product } });
  };

  const deleteProductHandler = (product) => () => {
    setProductTobeDeleted(product);
    onOpen();
  };

  const deleteHandler = (onClose) => async () => {
    await ProductsApi.deleteProduct(
      productToBeDeleted.id,
      page,
      limit,
      searchQuery
    );
    onClose();
  };

  useEffect(() => {
    ProductsApi.getProducts(page, limit, debounceSearchQuery);
  }, [page, limit, debounceSearchQuery]);

  // if (isLoading) {
  //   return (
  //     <div className="flex justify-center items-center h-full">
  //       <div className="animate-spin rounded-full h-32 w-32 border border-b-2 border-primary"></div>
  //     </div>
  //   );
  // }

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(price);
  };

  const totalPages = Math.ceil(total / 10);

  if (error) {
    return <div className="text-red-600 text-center">{error}</div>;
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">
            List of all products
          </h1>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                }}
                className="w-full pl-10 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary
            focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setPage(1);
                  }}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                  {<CloseFilledIcon />}
                </button>
              )}
            </div>
            <button
              onClick={createProductHandler}
              className="flex items-center justify-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-light sm:ml-3 sm:w-auto focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition duration-150 ease-in-out"
            >
              Create product
            </button>
          </div>
        </div>
      </div>

      <div className="mt-5 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-primary-dark">
                  <tr>
                    {columns.map((column) => (
                      <th
                        key={column.id}
                        scope="col"
                        className={`text-left text-sm font-semibold text-white ${column.className}`}
                      >
                        {column.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {productList.map((productItem, index) => {
                    return (
                      <tr
                        key={productItem.id}
                        className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                      >
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          {(page - 1) * 10 + index + 1}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {productItem.name}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {formatPrice(productItem.price)}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {productItem.stock}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {productItem.categories[0].name}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center">
                          <div className="flex justify-center items-center space-x-2">
                            <button onClick={updateProductHandler(productItem)}>
                              <PencilIcon className="h-5 w-5 text-primary hover:text-primary-light transition duration-150 ease-in-out" />
                            </button>
                            <button onClick={deleteProductHandler(productItem)}>
                              <TrashIcon className="h-5 w-5 text-red-900 hover:text-red-600 transition duration-150 ease-in-out" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div>
          <p className="text-md text-text-gray">
            Showing{" "}
            <span className="font-medium">{(page - 1) * 10 + 1} to</span>
            <span className="font-medium">{Math.min(page * 10, total)}</span> of
            <span className="font-medium">{total}</span> results
          </p>
        </div>
        <Pagination
          total={totalPages}
          color="primary"
          page={page}
          onChange={setPage}
          showControls
          showShadow
          size="md"
        />
      </div>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="opaque">
        <ModalContent className="flex flex-col gap-1">
          {(onClose) => {
            return (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Confirm Delete
                </ModalHeader>
                <ModalBody>
                  <p>
                    Are yous sure you want to delete this product with name{" "}
                    <span className="font-bold text-red-600">{`"${productToBeDeleted?.name}"`}</span>
                  </p>
                </ModalBody>
                <ModalFooter>
                  <Button color="default" variant="light" onPress={onClose}>
                    Cancel
                  </Button>
                  <Button color="danger" onPress={deleteHandler(onClose)}>
                    Yes, Delete
                  </Button>
                </ModalFooter>
              </>
            );
          }}
        </ModalContent>
      </Modal>
    </div>
  );
}

export default ProductsPage;
