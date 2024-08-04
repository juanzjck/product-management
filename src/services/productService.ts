import { Product } from "../interfaces/Product";

const baseUrl: string  = 'https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros';
const headers: RequestInit = {
    headers: {
        'authorId': '1715969646',
        'content-type': 'application/json'
    }
}

export const fetchProductList = async (): Promise<Product[]> => {
    const response = await fetch(`${baseUrl}/bp/products`, headers);
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    const data = await response.json();
    return data;
};
  
export const createProduct = async (product: Product): Promise<Product> => {
  const response = await fetch(`${baseUrl}/bp/products`, {
    method: 'POST',
    ...headers,
    body: JSON.stringify(product)
  });
  if (!response.ok) {
    throw new Error('Failed to create product');
  }
  const data = await response.json();
  return data;
};

export const verifyProductId = async (id: string): Promise<boolean> => {
  const response = await fetch(`${baseUrl}/bp/products/verification?id=${id}`, headers);
  if (!response.ok) {
    throw new Error('Failed to create product');
  }
  const data = await response.json();
  return data;
};

export const deleteProduct = async (productId: string): Promise<void> => {
  const response = await fetch(`${baseUrl}/bp/products?id=${productId}`, {
    ...headers,
    method: 'DELETE'
  });
  if (!response.ok) {
    throw new Error('Failed to delete product');
  }
};

export const updateProduct = async (product: Product): Promise<void> => {
  const response = await fetch(`${baseUrl}/bp/products`, {
    method: 'PUT',
    ...headers,
    body: JSON.stringify(product)
  });
  if (!response.ok) {
    throw new Error('Failed to update product');
  }
};