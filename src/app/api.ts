const API_URL = "https://api.escuelajs.co/api/v1";

export async function fetchProducts(search?: string) {
  const url = search
    ? `${API_URL}/products?title=${search}`
    : `${API_URL}/products`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}
