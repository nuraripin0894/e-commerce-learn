import { Select, SelectItem } from "@nextui-org/react";
import ProductFormLabel from "../../components/ProductFormLabel";
import PropTypes from "prop-types";

function ProductDetailsComponentPage(props) {
  const {
    isEditForm,
    product,
    categories,
    inputHandler,
    categoriesHandler,
    handleImageChange,
    handleRemoveImage,
    submitHandler,
    cancelHandler,
  } = props;
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
                onSelectionChange={categoriesHandler}
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
              onClick={cancelHandler}
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

ProductDetailsComponentPage.propTypes = {
  isEditForm: PropTypes.bool.isRequired,
  product: PropTypes.object,
  categories: PropTypes.arrayOf(PropTypes.object),
  inputHandler: PropTypes.func.isRequired,
  categoriesHandler: PropTypes.func.isRequired,
  handleImageChange: PropTypes.func.isRequired,
  handleRemoveImage: PropTypes.func.isRequired,
  submitHandler: PropTypes.func.isRequired,
  cancelHandler: PropTypes.func.isRequired,
};

export default ProductDetailsComponentPage;
