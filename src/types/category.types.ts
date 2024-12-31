export type Product = {
  _id: number;
  name: string;
  image: string;
  price: number;
  discountPrice: number;
  quantity: string;
};

export type Category = {
  _id: number;
  name: string;
  image: any;
  products?: Array<Product>;
};
