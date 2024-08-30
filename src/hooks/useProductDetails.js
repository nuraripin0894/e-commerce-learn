import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { IMAGE_PLACEHOLDER_URL } from "../constants/image.constant";
import { useSelector } from "react-redux";
import ProductsApi from "../apis/ProductsApi";

function useProductDetails() {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [productFrom, setProductFrom] = useState({
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
    setProductFrom((previousProductState) => {
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

  return {
    location,
    navigate,
    productFrom,
    setProductFrom,
    categories,
    productId,
    customSetProduct,
    isEditForm,
  };
}

export default useProductDetails;
