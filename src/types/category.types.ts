export type Product = {
  id: number;
  name: string;
  image: string;
  price: number;
  discountPrice: number;
  quantity: string;
};

export type Category = {
  id: number;
  name: string;
  image: any;
  products?: Array<Product>;
};
