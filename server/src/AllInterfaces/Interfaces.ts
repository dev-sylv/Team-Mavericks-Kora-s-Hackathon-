export interface UserDetails {
  name: string;
  username: string;
  email: string;
  image: string;
  phoneNumber: number;
  password: string;
  confirmPassword: string;
  status: string;
  TransactionHistory: {}[];
  // companyGiftCards: {}[];
  PurchasedGiftCards: {}[];
}
export interface BusinessDetails {
  name: string;
  email: string;
  logo: string;
  Balance: string;
  phoneNumber: number;
  password: string;
  confirmPassword: string;
  BusinessCode: string;
  status: string;
  TransactionHistory: {}[];
  giftCard: {}[];
}
