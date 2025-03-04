export interface OrderCustomer {
  name: string;
  email: string;
  avatar: string;
}

export interface OrderProduct {
  name: string;
  image: string;
  price: string;
  quantity: number;
}

export interface Order {
  code: string;
  customer: OrderCustomer;
  amount: number;
  date: Date;
  status: string;
  products: OrderProduct[];
}
