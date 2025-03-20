export interface Invoice {
  name: string;
  invoiceNumber: string;
  createDate: Date | string;
  dueDate: Date | string;
  amount: number;
  sent: number;
  status: string;
}
