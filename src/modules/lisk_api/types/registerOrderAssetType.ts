export interface RegisterOrderType {
  productId: string;
  productName: string;
  productDescription: string;
  minQuantityToSell: string,
  quantity: string;
  price: string;
  files: {
    filename: string;
    fileType: string;
    fileCategory: string;
    hash: string;
  }[];
  transport: {
    origin: string;
    destiny: string;
    location: string;
    date: number;
    status: string;
  }[];
};