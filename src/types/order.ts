export interface OrderCustomer {
  name: string;
  email: string;
  avatar: string;
}

export interface Order {
  code: string;
  customer: OrderCustomer;
  amount: number;
  date: Date;
  itemsCount: number;
  status: string;
}
