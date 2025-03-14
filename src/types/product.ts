export interface Product {
  image: string; // URL or path to the product image
  name: string; // Name of the product
  category: string; // Category of the product (e.g., "Shoes")
  createdAt: string; // ISO 8601 date string indicating when the product was created
  quantity: number; // Quantity of the product in stock
  price: number; // Price of the product
  status: "Published" | "Draft"; // Status of the product (either "Published" or "Draft")
}
