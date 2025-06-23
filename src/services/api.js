import axios from 'axios';

const API_URL = 'https://fakestoreapi.com';

export const getProducts = async (category) => {
  const url = category
    ? `${API_URL}/products/category/${category}`
    : `${API_URL}/products`;
  const response = await axios.get(url);
  return response.data;
};

export const getCategories = async () => {
  const response = await axios.get(`${API_URL}/products/categories`);
  return response.data;
};
