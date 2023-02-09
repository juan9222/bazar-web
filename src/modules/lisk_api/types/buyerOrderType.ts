export interface BuyerOrderType {
  id: string;
  sellerOrderId: string;
  status: string;
  token: string;
  exchangeRate: string;
  valueXKg: string;
  quantity: number;
  serviceFee: number;
  totalPayToken: number;
  totalPayInUSD: number;
  transacctionPayment: string;
  accountSeller: string;
  accountBuyer: string;
  productId: string;
  date: number;
  author: Buffer;
};