import React from "react";
import ProductsApi from "../../apis/ProductsApi";
import { IMAGE_PLACEHOLDER_URL } from "../../constants/image.constant";
import useProductDetails from "../../hooks/useProductDetails";
import ProductDetailsComponentPage from "./ProductDetailsComponentPage";

function ProductDetailsPageContainer() {
  const {
    navigate,
    productFrom: product,
    setProductFrom: setProduct,
    categories,
    productId,
    isEditForm,
  } = useProductDetails();

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setProduct((previousProduct) => {
      return {
        ...previousProduct,
        [name]: value,
      };
    });
  };

  const categoriesHandler = (select) => {
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

  const cancelHandler = () => {
    navigate(-1);
  };

  const uiComponentProps = {
    isEditForm,
    product,
    categories,
    inputHandler,
    categoriesHandler,
    handleImageChange,
    handleRemoveImage,
    submitHandler,
    cancelHandler,
  };

  return <ProductDetailsComponentPage {...uiComponentProps} />;
}

export default ProductDetailsPageContainer;
