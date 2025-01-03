import {Customer, DeliveryPartner, User} from './user.types';

export type OrderPayload = {
  items: {id: string | number; item: string | number; count: number};
  branch: string;
  totalPrice: number;
};

export type Location = {
  lat: number | string;
  lng: number | string;
  address?: string;
};

export type Branch = {
  location: Location;
  _id: string;
  name: string;
  Address: string;
};

export type Item = {
  id: string;
  item: string;
  count: number;
  _id: string;
};

export type Order = {
  customer: User<Customer>;
  branch: Branch;
  items: Item[];
  deliveryPartner: User<DeliveryPartner> | null;
  deliveryLocation: Location;
  pickupLocation: Location;
  status: string;
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
  _id: string;
  orderId: string;
};
