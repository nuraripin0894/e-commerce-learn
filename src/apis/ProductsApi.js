import dayjs from "dayjs";
import { setCategories } from "../redux/productCategories/productCategoriesSlice";
import {
  setError,
  setLoading,
  setProducts,
  createProduct,
  updateProduct,
} from "../redux/products/productsSlice";
import store from "../redux/store";
import axiosInstance from "./axiosInstance";
import { toast } from "sonner";

class ProductsApi {
  static async getProducts(page = 1, limit = 10, query) {
    store.dispatch(setLoading(true));

    try {
      const resp = await axiosInstance.get("/products", {
        params: {
          page,
          limit,
          query,
        },
      });
      const { data } = resp;
      store.dispatch(
        setProducts({
          items: data.items,
          total: data.total,
        })
      );
    } catch (error) {
      console.log(error);
      store.dispatch(setError(error.message));
      throw new Error(`ProductAPI ${error.message}`);
    } finally {
      store.dispatch(setLoading(false));
    }
  }

  static async getCategories() {
    const lastSet = store.getState().productCategories.lastSet;
    store.dispatch(setLoading(true));
    try {
      const currentDate = dayjs(new Date().toISOString());
      const isLessThanOneHour = currentDate.diff(lastSet, "hour", true) < 1;
      if (isLessThanOneHour) {
        return;
      }
      const resp = await axiosInstance.get("/categories");
      const { data } = resp;
      store.dispatch(setCategories(data));
    } catch (error) {
      store.dispatch(setError(error.message));
      throw new Error(`ProductAPI ${error.message}`);
    } finally {
      const currentDate = dayjs(new Date().toISOString());
      const isLessThanOneHour = currentDate.diff(lastSet, "hour", true) < 1;
      if (isLessThanOneHour) {
        // eslint-disable-next-line no-unsafe-finally
        return;
      }
      store.dispatch(setLoading(false));
    }
  }

  static async getProduct(id) {
    store.dispatch(setLoading(true));
    try {
      const response = await axiosInstance.get(`/products/${id}`);
      return response.data;
    } catch (error) {
      console.log(`Error get product: ${error.message}`);
      store.dispatch(setError(error.message));
    } finally {
      store.dispatch(setLoading(false));
    }
  }

  static async createProduct(productData) {
    store.dispatch(setLoading(true));
    try {
      const response = await axiosInstance.post(`/products`, productData, {
        headers: { "Content-type": "multipart/form-data" },
      });
      store.dispatch(createProduct(response.data));
      toast.success("Product created successfully");
    } catch (error) {
      console.log(`Error add product: ${error.message}`);
      store.dispatch(setError(error.message));
      toast.error("Failed to create product");
    } finally {
      store.dispatch(setLoading(false));
    }
  }

  static async updateProduct(id, productData) {
    store.dispatch(setLoading(true));
    try {
      const response = await axiosInstance.put(`/products/${id}`, productData, {
        headers: { "Content-type": "multipart/form-data" },
      });
      store.dispatch(updateProduct(response.data));
      toast.success("Product updated successfully");
    } catch (error) {
      console.log(`Error update product: ${error.message}`);
      store.dispatch(setError(error.message));
      toast.error("Failed to update product");
    } finally {
      store.dispatch(setLoading(false));
    }
  }
}

export default ProductsApi;
