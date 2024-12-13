import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [],
  isLoading: false,
  setProducts: (products) => set({ products }),
  createProduct: async (newProduct) => {
    set({ isLoading: true });
    try {
      if (!newProduct.name || !newProduct.price || !newProduct.image) {
        throw new Error("Please fill in all fields.");
      }

      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      set((state) => ({
        products: [...state.products, data.data],
        isLoading: false,
      }));

      return { success: true, message: "Product successfully created." };
    } catch (error) {
      console.error("Error creating product:", error);
      set({ isLoading: false });
      return {
        success: false,
        message:
          error.message || "An error occurred while creating the product.",
      };
    }
  },
  fetchProducts: async () => {
    set({ isLoading: true });
    try {
      const res = await fetch("/api/products");
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      set({ products: data.data, isLoading: false });
    } catch (error) {
      console.error("Error fetching products:", error);
      set({ isLoading: false });
    }
  },
  deleteProduct: async (pid) => {
    try {
      const res = await fetch(`/api/products/${pid}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to delete product");
      }
      set((state) => ({
        products: state.products.filter((product) => product._id !== pid),
      }));
      return { success: true, message: "Product successfully deleted" };
    } catch (error) {
      return { success: false, message: error.message };
    }
  },
  updateProduct: async (pid, updatedProduct) => {
    const res = await fetch(`/api/products/${pid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    });
    const data = await res.json();
    if (!data.success) return { success: false, message: data.message };
    set((state) => ({
      products: state.products.map((product) =>
        product._id === pid ? data.data : product
      ),
    }));
    return { success: true, message: "Product successfully updated." };
  },
}));
