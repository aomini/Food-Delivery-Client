export type Product = {
  _id: string;
  name: string;
  image: string;
  price: number;
  discount: number;
  quantity: string;
};

export type Category = {
  _id: string;
  name: string;
  image: any;
  products?: Array<Product>;
};
