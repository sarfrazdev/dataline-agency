import axiosInstance from './axiosInstance';
import { API_PATH, BASE_URL } from './apiPath';

export const getCart = async () => {
  try {
    const response = await axiosInstance.get(`${BASE_URL}${API_PATH.CART.GET}`);
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || 'Failed to fetch cart');
  }
};

export const updateCartItem = async (itemId, quantity) => {
  try {
    const response = await axiosInstance.put(
      `${BASE_URL}${API_PATH.CART.UPDATE(itemId)}`,
      { quantity }
    );
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || 'Failed to update cart');
  }
};

export const removeFromCart = async (itemId) => {
  try {
    const response = await axiosInstance.delete(
      `${BASE_URL}${API_PATH.CART.REMOVE(itemId)}`
    );
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || 'Failed to remove item');
  }
};