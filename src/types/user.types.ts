export type Customer = 'customer';
export type DeliveryPartner = 'delivery_partner';

export type User<T = Customer | DeliveryPartner> = {
  _id: string;
  isActive: boolean;
  phone: number;
  role: T;
};
