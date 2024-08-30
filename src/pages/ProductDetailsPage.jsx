import { Select, SelectItem } from "@nextui-org/react";
import ProductFormLabel from "../components/ProductFormLabel";
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { useEffect, useState } from "react";
import ProductsApi from "../apis/ProductsApi";
import { useSelector } from "react-redux";
import { IMAGE_PLACEHOLDER_URL } from "../constants/image.constant";
import { setProducts } from "../redux/products/productsSlice";

function ProductDetailsPage() {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    categoryIds: [],
    image: null,
    imageUrl: IMAGE_PLACEHOLDER_URL,
  });

  const categories = useSelector((state) => {
    return state.productCategories.items;
  });

  const { id: productId } = params;

  const customSetProduct = (product) => {
    setProduct((previousProductState) => {
      return {
        ...previousProductState,
        ...product,
        categoryIds: product.categories.map((categoryItem) =>
          categoryItem.id.toString()
        ),
        imageUrl:
          product.imageUrls && product.imageUrls.length > 0
            ? product.imageUrls[0]
            : IMAGE_PLACEHOLDER_URL,
      };
    });
  };

  const getProductDetail = async (productId) => {
    const productDetail = await ProductsApi.getProduct(productId);
    customSetProduct(productDetail);
  };

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setProduct((previousProduct) => {
      return {
        ...previousProduct,
        [name]: value,
      };
    });
  };

  const categorieshandler = (select) => {
    setProduct((previousProduct) => {
      return {
        ...previousProduct,
        categoryIds: [...select],
      };
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProduct((prevProduct) => {
          return {
            ...prevProduct,
            image: file,
            imageUrl: reader.result,
          };
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setProduct((prevProduct) => {
      return {
        ...prevProduct,
        image: null,
        imageUrl: IMAGE_PLACEHOLDER_URL,
      };
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", product.name);
      formData.append("description", product.description);
      formData.append("price", product.price);
      formData.append("stock", product.stock);
      formData.append("categoryIds", product.categoryIds.join(","));

      if (product.image) {
        formData.append("image", product.image);
      }

      if (productId) {
        await ProductsApi.updateProduct(productId, formData);
      } else {
        await ProductsApi.createProduct(formData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    ProductsApi.getCategories();

    if (productId) {
      const navigationState = location.state;
      const { product } = navigationState;
      customSetProduct(product);
      getProductDetail(productId);
    }
  }, [productId]);

  const isEditForm = !!productId;

  const cancelhandler = () => {
    navigate(-1);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        {isEditForm ? "Update Product" : "Create Product"}
      </h1>

      <form className="space-y-6" onSubmit={submitHandler}>
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-6">
            <div>
              <ProductFormLabel name="name" />
              <input
                id="name"
                name="name"
                type="text"
                className="w-full px-3 py-2 border-gray-300 border rounded-md focus:outline-none focus:ring-2
            focus:ring-blue-500"
                placeholder="Enter product name"
                required
                value={product.name}
                onChange={inputHandler}
              />
            </div>
            <div>
              <ProductFormLabel name="description" />
              <textarea
                id="description"
                name="description"
                className="w-full px-3 py-2 border-gray-300 border rounded-md focus:outline-none focus:ring-2
            focus:ring-blue-500"
                placeholder="Enter product description"
                required
                value={product.description}
                onChange={inputHandler}
              />
            </div>
            <div>
              <ProductFormLabel name="price" />
              <input
                id="price"
                name="price"
                type="number"
                className="w-full px-3 py-2 border-gray-300 border rounded-md focus:outline-none focus:ring-2
            focus:ring-blue-500"
                placeholder="Enter product price"
                required
                value={product.price}
                onChange={inputHandler}
              />
            </div>
            <div>
              <ProductFormLabel name="stock" />
              <input
                id="stock"
                name="stock"
                type="number"
                className="w-full px-3 py-2 border-gray-300 border rounded-md focus:outline-none focus:ring-2
            focus:ring-blue-500"
                placeholder="Enter product stock"
                required
                value={product.stock}
                onChange={inputHandler}
              />
            </div>
            <div>
              <ProductFormLabel name="categories" />
              <Select
                id="categories"
                name="categories"
                selectionMode="multiple"
                placeholder="Select categories"
                className="w-full"
                selectedKeys={product.categoryIds}
                onSelectionChange={categorieshandler}
              >
                {categories.map((categoryItem) => (
                  <SelectItem
                    key={categoryItem.id.toString()}
                    value={categoryItem.id.toString()}
                  >
                    {categoryItem.name}
                  </SelectItem>
                ))}
              </Select>
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <ProductFormLabel name="image" />
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <img
                    src={product.imageUrl}
                    alt="Product preview"
                    className="mx-auto h-64 w-64 object-cover rounded-md"
                  />
                  <div>
                    <div className="flex text-sm text-gray-600 justify-center mt-2">
                      <ProductFormLabel
                        name="file-upload"
                        textLabel="Upload a file"
                        customClassName="relative cursor-pointer bg-white rounded-md font-medium text-blue-600
                      hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                        withSpan
                      >
                        <span>{"Upload a file"}</span>
                        <input
                          type="file"
                          name="file-upload"
                          id="file-upload"
                          className="sr-only"
                          onChange={handleImageChange}
                        />
                      </ProductFormLabel>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF up to 10MB
                    </p>
                    <button
                      onClick={handleRemoveImage}
                      type="button"
                      className="mt-2 px-3 py-1 text-sm font-medium text-red-600 bg-white border
                       border-red-300 rounded-md hover:bg-red-50 
                      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      Remove Image
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end space-x-4">
            <button
              onClick={cancelhandler}
              type="button"
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {isEditForm ? "Update Product" : "Create Product"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
export default ProductDetailsPage;
