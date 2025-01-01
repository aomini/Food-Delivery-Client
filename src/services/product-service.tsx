import {Category, Product} from '@/types/category.types';
import axios from 'axios';
import {BASE_URL} from './config';

export const getCategories = async () => {
  const response = await axios.get<Category[]>(
    `${BASE_URL}/products/categories`,
  );
  return response.data;
};

export const getProductsByCategory = async (id: string) => {
  const response = await axios.get<Product[]>(
    `${BASE_URL}/products/categories/${id}`,
  );
  return response.data;
};
