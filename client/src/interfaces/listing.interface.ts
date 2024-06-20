export interface IListingData {
  title: string;
  description: string;
  price: number | string;
  type: string;
  photos: string;
  used_time: string;
  isNegotiable: string;
  college: string;
  seller_Id: string;
}

export interface IListing {
  _id: string;
  title: string;
  description: string;
  price: string;
  type: string;
  photos: string[];
  used_time: string;
  isNegotiable: boolean;
  seller_Id: string;
  sold: string;
  createdAt: string;
  updatedAt: string;
  college: string;
}
